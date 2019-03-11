<template>
  <div class="diagram-component" :title="component.name" :style="componentStyle(component)">
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
export default{
  name: 'diagram-component',
  props: {
    component: {
      type: Object
    }
  },
  methods: {
    componentPosition() {
      return store.getters.componentDiagramPosition(this.component)
    },
    componentStyle() {
      const position = this.componentPosition(this.component)
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
    }
  }

}
</script>