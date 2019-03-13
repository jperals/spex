<template>
  <div class="diagram-item" :title="component.name" draggable="true">
    <img v-if="component.imageUrl" :src="component.imageUrl">
    <label class="component-name">{{component.name}}</label>
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
  .component-name {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 2px);
    font-size: 12px;
    hyphens: auto;
    border-radius: 3px;
    display: block;
    padding-left: 7%;
    padding-right: 5%;
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
    background-color: #e7e7e7;
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
      this.currentDrag = {
        x: event.x - this.initialDragCoords.x,
        y: event.y - this.initialDragCoords.y
      }
      this.currentCoords = {
        x: this.initialCoords.x + this.currentDrag.x,
        y: this.initialCoords.y + this.currentDrag.y
      }
      console.log('drag', new Date())
      this.updateElementPosition()
      return false
    },
    dragend(event) {
      this.drag(event)
      this.initialDragCoords = null
      this.initialCoords = this.currentCoords
      store.commit('updateDiagramItemPosition', {
        item: this.item,
        newPosition: this.currentCoords
      })
      return false
    },
    dragstart(event) {
      console.log('dragstart', event)
      this.initialDragCoords = {
        x: event.x,
        y: event.y
      }
      this.currentCoords = this.initialDragCoords
      return false
    },
    updateElementPosition() {
      const style = this.componentStyle()
      // console.log('style', style)
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