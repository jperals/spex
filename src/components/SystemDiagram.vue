<template>
  <div class="system-diagram">
    <diagram-component :component="component" v-for="component in components" :key="component.id" ></diagram-component>
  </div>
</template>

<style lang="scss" scoped>

// Layout
.diagram-component {
  display: inline-block;
}

</style>

<script>
import DiagramComponent from '@/components/DiagramComponent'
import store from '@/store'
export default {
  name: 'system-diagram',
  props: {
    story: {
      type: Object
    }
  },
  components: {
    DiagramComponent
  },
  computed: {
    components() {
      return store.getters.linkedComponents(this.story)
    }
  }
}

</script>
