<template>
  <div class="system-diagram">
    <div class="diagram-component" v-for="component in components" :key="component.id" :title="component.name">
      <img v-if="component.imageUrl" :src="component.imageUrl">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.diagram-component {
  display: inline-block;
}
.diagram-component {
  background-color: lightgray;
  width: 50px;
  height: 50px;
  margin: 30px;
  img {
    display: block;
    width: 100%;
    height: 100%;
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
