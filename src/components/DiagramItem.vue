<template>
  <div class="diagram-item" :class="{dragging}" :style="componentStyle">
    <div class="component-name">
      <label>{{componentName}}</label>
      <div class="remove-button" @click="removeItem" ref="removeButton">&times;</div>
    </div>
    <div class="component-image" draggable="false">
      <img v-if="imageUrl" :src="imageUrl" draggable="false">
    </div>
  </div>
</template>

<style lang="scss" scoped>

// Layout
.diagram-item {
  $square-side: 50px;
  width: $square-side;
  margin-left: - $square-side/2;
  margin-top: - $square-side/2;
  .component-image {
    width: 100%;
    height: $square-side;
    position: relative;
    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: $square-side;
    }
  }
  .component-name {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    font-size: 12px;
    display: flex;
    align-items: center;
    border-radius: $square-side/2 0 0 $square-side/2;
    box-sizing: border-box;
    padding-left: $square-side + 5px;
    padding-right: 5px;
    min-width: $square-side * 2;
  }
  .remove-button {
    $side: 12px;
    position: absolute;
    top: - $side/2;
    right: - $side/2;
    width: $side;
    height: $side;
    border-radius: 50%;
    text-align: center;
    line-height: $side;
    font-weight: bold;
  }
}

// Colors
.component-image {
  background-color: #ddd;
}
.component-name {
  color: #1F2122;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.remove-button {
  background-color: gray;
  border: 1px solid white;
  color: white;
}

// UX
.diagram-item,
.component-name {
  cursor: pointer;
  user-select: none;
}
.remove-button {
  opacity: 0;
}
.diagram-item:not(.dragging):hover {
  .remove-button {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
}

</style>

<script>
import store from '@/store'

export default {
  name: 'diagram-item',
  props: {
    item: {
      type: Object
    },
    focusOut: {
      type: Boolean
    },
    parentElement: {
      type: Object
    }
  },
  data() {
    const component = this.item ? store.getters.componentById(this.item.componentId) : null
    const currentCoords = this.item ? Object.assign({}, this.item.position) : null
    const imageUrl = component ? component.imageUrl : null
    return {
      component,
      currentCoords,
      currentDrag: {
        x: 0,
        y: 0
      },
      dragging: false,
      imageUrl,
      initialDragCoords: null,
      initialCoords: currentCoords,
      mouseDown: false
    }
  },
  methods: {
    drag(event) {
      this.dragging = true
      this.currentDrag = {
        x: event.x - this.initialDragCoords.x,
        y: event.y - this.initialDragCoords.y
      }
      this.currentCoords = {
        x: this.initialCoords.x + this.currentDrag.x,
        y: this.initialCoords.y + this.currentDrag.y
      }
      store.commit('updateDiagramItemPosition', {
        item: this.item,
        newPosition: this.currentCoords
      })
      return false
    },
    dragend() {
      this.initialDragCoords = null
      this.initialCoords = this.currentCoords
      console.log('dragend')
      this.currentDrag = {
        x: 0,
        y: 0
      }
      store.dispatch('updateDiagramItem', {
        item: this.item,
        newProperties: {
          position: this.currentCoords
        }
      })
      return false
    },
    dragstart(event) {
      store.dispatch('setFocus', 'diagram')
      this.mouseDown = true
      this.initialDragCoords = {
        x: event.x,
        y: event.y
      }
      return false
    },
    openComponent() {
      store.dispatch("openComponent", this.component);
    },
    removeItem() {
      store.dispatch('removeDiagramItem', this.item)
    }
  },
  mounted() {
    this.$el.addEventListener('mousedown', event => {
      this.dragstart(event)
    })
    this.$el.parentElement.addEventListener('mousemove', event => {
      if(this.mouseDown) {
        this.drag(event)
      }
    })
    this.$el.addEventListener('mouseup', event => {
      console.log(this.dragging)
      if (this.dragging) {
        this.dragend(event)
      } else if (event.target !== this.$refs.removeButton) {
        this.openComponent()
      }
      this.mouseDown = false
      this.dragging = false
    })
  },
  computed: {
    componentName() {
      if (typeof this.component === 'object' && this.component !== null) {
        return this.component.name
      }
      return ''
    },
    componentStyle() {
      const position = this.currentCoords
      if (typeof position === 'object' && position !== null) {
        return {
          transform: `translate(${position.x}px, ${position.y}px)`
        }
      } else {
        return {}
      }
    },
    focusedElement() {
      return store.getters.focusedElement
    }
  }
}
</script>

<docs>
  ```jsx
  <diagram-item></diagram-item>
  ```
</docs>