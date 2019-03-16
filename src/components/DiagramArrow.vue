<template>
  <div class="diagram-arrow" :style="arrowStyle">
    <div class="arrow-line" :style="lineStyle"></div>
    <div class="remove-element" title="Remove relationship" :style="removeElementStyle" @click="removeRelationship"></div>
    <div class="arrow-tip" :style="arrowTipStyle">
      <div class="arrow-line arrow-stroke arrow-stroke-1"></div>
      <div class="arrow-line arrow-stroke arrow-stroke-2"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

// Layout
$stroke-width: 1px;
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
  transform-origin: left center;
  width: 1px;
  height: $stroke-width;
  position: absolute;
  top: - $stroke-width/2;
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

.remove-element {
  $side: 15px;
  width: $side;
  height: $side;
  border-radius: 50%;
  left: - $side/2;
  top: - $side/2;
  position: absolute;
  cursor: pointer;
}

// Colors

.arrow-line {
  background-color: #979C9E;
}

.remove-element {
  background-color: pink;
}

// UX
.arrow-line:after {
  $height: 10px;
  content: '';
  display: block;
  width: 100%;
  height: calc(100% + #{$height});
  position: relative;
  top: - $height/2 - $stroke-width/2;
}

.remove-element {
  opacity: 0;
}

.diagram-arrow:hover .remove-element {
  opacity: 1;
}
</style>

<script>
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
    arrowStyle() {
      return {
        transform: `translate(${this.from.x}px, ${this.from.y}px) rotate(${this.rotationInDegrees}deg)`
      }
    },
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
      let scaleFactor = this.lineLength - this.distanceBefore
      scaleFactor = Math.max(0, scaleFactor)
      return {
        transform: `translateX(${this.distanceBefore}px) scaleX(${scaleFactor})`
      }
    },
    removeElementStyle() {
      const x = (this.lineLength + this.distanceBefore)/2
      return {
        transform: `translateX(${x}px)`
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
    }
  },
  methods: {
    removeRelationship() {
      this.$emit('removeRelationship')
    }
  }
}
</script>
