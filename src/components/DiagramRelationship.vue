<template>
  <div class="diagram-relationship" :style="relationshipStyle">
    <div class="line" :style="lineStyle"></div>
    <div class="arrow-tip" :style="arrowTipStyle">
      <div class="line arrow-stroke arrow-stroke-1"></div>
      <div class="line arrow-stroke arrow-stroke-2"></div>
    </div>
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
    position: absolute;
    top: 0;
    &.arrow-stroke {
      transform-origin: right center;
    }
    &.arrow-stroke-1 {
      transform: rotate(20deg) scaleX(8);
    }
    &.arrow-stroke-2 {
      transform: rotate(-20deg) scaleX(8);
    }
  }
}
</style>

<script>
import store from '@/store'

const strokeWidth = 1
const blankSpaceBetweenFirstItemAndLine = 100
const blankSpaceBetweenLineAndSecondItem = 50

export default {
  name: 'diagram-relationship',
  props: {
    relationship: {
      type: Object
    }
  },
  computed: {
    arrowTipStyle() {
      return {
        transform: `translateX(${this.lineLength}px)`
      }
    },
    distance() {
      return Math.sqrt(this.width * this.width + this.height * this. height)
    },
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
    lineLength() {
      return this.distance - blankSpaceBetweenLineAndSecondItem
    },
    lineStyle() {
      let scaleFactor = (this.lineLength - blankSpaceBetweenFirstItemAndLine) / strokeWidth
      scaleFactor = Math.max(0, scaleFactor)
      return {
        transform: `translateX(${blankSpaceBetweenFirstItemAndLine}px) scaleX(${scaleFactor})`
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
