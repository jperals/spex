<template>
  <div class="diagram-arrow" :style="arrowStyle">
    <div class="arrow-line" :style="lineStyle"></div>
    <div class="arrow-tip" :style="arrowTipStyle">
      <div class="arrow-line arrow-stroke arrow-stroke-1"></div>
      <div class="arrow-line arrow-stroke arrow-stroke-2"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.diagram-arrow {
  position: absolute;
  left: 0;
  right: 0;
  transform-origin: left center;
  width: 0;
  height: 0;
  overflow: visible;
}

.arrow-line {
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
</style>

<script>
const strokeWidth = 1
export default {
  name: 'diagram-arrow',
  props: {
    from: {
      type: Object
    },
    to: {
      type: Object
    },
    distanceBefore: {
      type: Number,
      default: 100
    },
    distanceAfter: {
      type: Number,
      default: 0
    }
  },
  computed: {
    arrowTipStyle() {
      return {
        transform: `translateX(${this.lineLength}px)`
      }
    },
    distance() {
      return Math.sqrt(this.width * this.width + this.height * this.height)
    },
    width() {
      return Math.abs(this.to.x - this.from.x)
    },
    height() {
      return Math.abs(this.to.y - this.from.y)
    },
    lineLength() {
      return this.distance - this.distanceAfter
    },
    lineStyle() {
      let scaleFactor = (this.lineLength - this.distanceBefore) / strokeWidth
      scaleFactor = Math.max(0, scaleFactor)
      return {
        transform: `translateX(${this.distanceBefore}px) scaleX(${scaleFactor})`
      }
    },
    rotationInDegrees() {
      return this.rotationInRadians * 180 / Math.PI
    },
    rotationInRadians() {
      let angle = Math.atan((this.to.y - this.from.y) / (this.to.x - this.from.x))
      if (this.to.x < this.from.x) {
        angle += Math.PI
      }
      return angle
    },
    arrowStyle() {
      return {
        transform: `translate(${this.from.x}px, ${this.from.y}px) rotate(${this.rotationInDegrees}deg)`
      }
    }
  }
}
</script>
