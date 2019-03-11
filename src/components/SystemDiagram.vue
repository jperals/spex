<template>
  <div class="system-diagram">
    <div class="diagram-component" v-for="component in components" :key="component.id" :title="component.name">
      <label class="component-name">{{component.name}}</label>
      <img v-if="component.imageUrl" :src="component.imageUrl">
    </div>
  </div>
</template>

<style lang="scss" scoped>

// Layout
.diagram-component {
  display: inline-block;
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
  name: 'system-diagram',
  props: {
    story: {
      type: Object
    }
  },
  computed: {
    components() {
      return store.getters.linkedComponents(this.story)
    }
  }
}

</script>
