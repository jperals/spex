<template>
  <div class="diagram-component" :title="component.name" draggable="true">
    <label class="component-name">{{component.name}}</label>
    <img v-if="component.imageUrl" :src="component.imageUrl">
  </div>
</template>

<style lang="scss" scoped>

// Layout
.diagram-component {
  width: 50px;
  height: 50px;
  margin: 30px;
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
.diagram-component {
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
    component: {
      type: Object
    }
  },
  data() {
    return {
      currentCoords: store.getters.componentDiagramPosition(this.component),
      currentDrag: {
        x: 0,
        y: 0
      },
      initialDragCoords: null,
      initialCoords: store.getters.componentDiagramPosition(this.component)
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
      store.dispatch('moveDiagramComponentPosition', {
        component: this.component,
        delta: this.currentCoords
      }).then(this.updateElementPosition)
      this.initialDragCoords = null
      this.initialCoords = this.currentCoords
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
  }
}
</script>