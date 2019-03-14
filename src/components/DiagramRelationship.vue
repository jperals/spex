<template>
  <div class="diagram-relationship" :style="relationshipStyle">
    <div class="line" :style="lineStyle"></div>
  </div>
</template>

<style lang="scss" scoped>
.diagram-relationship {
  position: absolute;
  left: 0;
  right: 0;
  transform-origin: left center;
  width: 0;
  height: 0;
  overflow: visible;
  .line {
    background-color: #979C9E;
    transform-origin: left center;
    width: 1px;
    height: 1px;
  }
}
</style>

<script>
import store from '@/store'

const strokeWidth = 1

export default {
  name: 'diagram-relationship',
  props: {
    relationship: {
      type: Object
    }
  },
  computed: {
    position1() {
      return store.getters.diagramItemById(this.relationship.from.itemId).position
    },
    position2() {
      return store.getters.diagramItemById(this.relationship.to.itemId).position
    },
    width() {
      return Math.abs(this.position2.x - this.position1.x)
    },
    height() {
      return Math.abs(this.position2.y - this.position1.y)
    },
    lineStyle() {
      const distance = Math.sqrt(this.width * this.width + this.height * this. height)
      const scaleFactor = distance / strokeWidth
      return {
        transform: `scaleX(${scaleFactor})`
      }
    },
    rotationInDegrees() {
      return this.rotationInRadians * 180 / Math.PI
    },
    rotationInRadians() {
      let angle = Math.atan((this.position2.y - this.position1.y) / (this.position2.x - this.position1.x))
      if (this.position2.x < this.position1.x) {
        angle += Math.PI
      }
      return angle
    },
    relationshipStyle() {
      return {
        transform: `translate(${this.position1.x}px, ${this.position1.y}px) rotate(${this.rotationInDegrees}deg)`
      }
    }
  }
}
</script>
