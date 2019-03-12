<template>
  <div class="diagram-item" :title="component.name" draggable="true">
    <label class="component-name">{{component.name}}</label>
    <img v-if="component.imageUrl" :src="component.imageUrl">
  </div>
</template>

<style lang="scss" scoped>

// Layout
.diagram-item {
  $side : 50px;
  width: $side;
  height: $side;
  margin-left: - $side/2;
  margin-top: - $side/2;
  position: relative;
  .component-name {
    position: absolute;
    left: 10%;
    right: 10%;
    top: 5%;
    line-height: 1em;
    font-size: 14px;
  }
  img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

// Colors
.diagram-item {
  background-color: #ddd;
  .component-name {
    color: #999;
  }
}

</style>

<script>
import store from '@/store'

export default {
  name: 'diagram-component',
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      currentCoords: this.item.position,
      currentDrag: {
        x: 0,
        y: 0
      },
      initialDragCoords: null,
      initialCoords: this.item.position
    }
  },
  methods: {
    componentStyle() {
      const position = this.currentCoords
      if (typeof position === 'object') {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `translate(${position.x}px, ${position.y}px)`
        }
      } else {
        return {}
      }
    },
    drag(event) {
      this.currentDrag = {
        x: event.x - this.initialDragCoords.x,
        y: event.y - this.initialDragCoords.y
      }
      this.currentCoords = {
        x: this.initialCoords.x + this.currentDrag.x,
        y: this.initialCoords.y + this.currentDrag.y
      }
      this.updateElementPosition()
    },
    dragend(event) {
      this.drag(event)
      this.initialDragCoords = null
      this.initialCoords = this.currentCoords
      store.commit('updateDiagramItemPosition', {
        item: this.item,
        newPosition: this.currentCoords
      })
    },
    dragstart(event) {
      this.initialDragCoords = {
        x: event.x,
        y: event.y
      }
      this.currentCoords = this.initialDragCoords
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