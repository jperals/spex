<template>
  <div class="diagram-item" :title="component.name" @click="openComponent" draggable="true">
    <div class="component-image">
      <img v-if="component.imageUrl" :src="component.imageUrl">
    </div>
    <label class="component-name">{{component.name}}</label>
  </div>
</template>

<style lang="scss" scoped>

// Layout
.diagram-item {
  $side : 50px;
  width: $side;
  margin-left: - $side/2;
  margin-top: - $side/2;
  .component-image {
    width: 100%;
    height: $side;
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
    margin-top: 2px;
    font-size: 12px;
    hyphens: auto;
    border-radius: 3px;
    display: block;
    padding-left: 7%;
    padding-right: 5%;
  }
}

// Colors
.diagram-item {
  .component-image {
    background-color: #ddd;
  }
  .component-name {
    color: #999;
    background-color: #e7e7e7;
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
  name: 'diagram-component',
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      currentCoords: Object.assign({}, this.item.position),
      currentDrag: {
        x: 0,
        y: 0
      },
      initialDragCoords: null,
      initialCoords: Object.assign({}, this.item.position)
    }
  },
  methods: {
    componentStyle() {
      const position = this.currentCoords
      if (typeof position === 'object') {
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
    component() {
      return store.getters.componentById(this.item.componentId)
    }
  }
}
</script>