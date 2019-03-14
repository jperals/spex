<template>
  <div class="diagram-item" :title="componentName" @click="openComponent" draggable="true">
    <label class="component-name">{{componentName}}</label>
    <div class="component-image">
      <img v-if="imageUrl" :src="imageUrl">
    </div>
  </div>
</template>

<style lang="scss" scoped>

// Layout
.diagram-item {
  $side: 50px;
  width: $side;
  margin-left: - $side/2;
  margin-top: - $side/2;
  .component-image {
    width: 100%;
    height: $side;
    position: relative;
    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: $side;
    }
  }
  .component-name {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    font-size: 12px;
    padding-left: $side + 5px;
    padding-right: 5px;
    display: flex;
    align-items: center;
    border-radius: $side/2 0 0 $side/2;
  }
}

// Colors
.diagram-item {
  .component-image {
    background-color: #ddd;
  }
  .component-name {
    color: #1F2122;
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
}

// UX
.diagram-item,
.component-name {
  cursor: pointer;
}

</style>

<script>
import store from '@/store'

// Use transparent ghost image for drag
// https://stackoverflow.com/a/49535378
const img = new Image();
img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

export default {
  name: 'diagram-item',
  props: {
    item: {
      type: Object
    }
  },
  data() {
    const component = this.item ? store.getters.componentById(this.item.componentId) : null
    const currentCoords = this.item ? Object.assign({}, this.item.position) : null
    const imageUrl = component ? component.imageUrl : null
    const initialCoords = currentCoords
    return {
      component,
      currentCoords,
      currentDrag: {
        x: 0,
        y: 0
      },
      imageUrl,
      initialDragCoords: null,
      initialCoords
    }
  },
  methods: {
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
    drag(event) {
      if (event.x === 0 && event.y === 0) {
        return false
      }
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
      this.updateElementPosition()
      return false
    },
    dragend() {
      this.initialDragCoords = null
      this.initialCoords = this.currentCoords
      store.dispatch('updateDiagramItem', {
        item: this.item,
        newProperties: {
          position: this.currentCoords
        }
      })
      return false
    },
    dragstart(event) {
      // Use transparent ghost image for drag
      // https://stackoverflow.com/a/49535378
      event.dataTransfer.setDragImage(img, 0, 0);
      this.initialDragCoords = {
        x: event.x,
        y: event.y
      }
      this.currentCoords = this.initialDragCoords
      return false
    },
    openComponent() {
      store.dispatch("openComponent", this.component);
    },
    updateElementPosition() {
      const style = this.componentStyle()
      Object.assign(this.$el.style, style)
    }
  },
  mounted() {
    this.$el.addEventListener('dragstart', event => {
      this.dragstart(event)
    })
    this.$el.addEventListener('drag', event => {
      this.drag(event)
    })
    this.$el.addEventListener('dragend', event => {
      this.dragend(event)
    })
    this.updateElementPosition()
  },
  computed: {
    componentName() {
      if (typeof this.component === 'object' && this.component !== null) {
        return this.component.name
      }
      return ''
    }
  }
}
</script>

<docs>
  ```jsx
  <diagram-item></diagram-item>
  ```
</docs>