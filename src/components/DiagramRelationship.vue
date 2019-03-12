<template>
  <svg class="diagram-relationship" :viewBox="viewBox" :style="style">
    <line :x1="x1" :y1="y1" :x2="x2" :y2="y2" stroke="lightgray"/>
  </svg>
</template>

<style>
.diagram-relationship {
  position: absolute;
}
</style>

<script>
import store from '@/store'
export default {
  name: 'diagram-relationship',
  props: {
    relationship: {
      type: Object
    }
  },
  computed: {
    position1() {
      return store.getters.diagramItemById(this.relationship.from).position
    },
    position2() {
      return store.getters.diagramItemById(this.relationship.to).position
    },
    x1() {
      return this.position1.x - this.left
    },
    y1() {
      return this.position1.y - this.top
    },
    x2() {
      return this.position2.x - this.left
    },
    y2() {
      return this.position2.y - this.top
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    width() {
      return Math.abs(this.position2.x - this.position1.x)
    },
    height() {
      return Math.abs(this.position2.y - this.position1.x)
    },
    left() {
      return Math.min(this.position1.x, this.position2.x)
    },
    top() {
      return Math.min(this.position1.y, this.position2.y)
    },
    style() {
      return {
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height
      }
    }
  }
}
</script>
