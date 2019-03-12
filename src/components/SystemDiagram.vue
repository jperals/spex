<template>
  <div class="system-diagram">
    <diagram-item :item="item" v-for="item in items" :key="item.id" ></diagram-item>
  </div>
</template>

<style lang="scss" scoped>

// Layout
.diagram-item {
  display: inline-block;
}

</style>

<script>
import DiagramItem from '@/components/DiagramItem'
import store from '@/store'
export default {
  name: 'system-diagram',
  props: {
    story: {
      type: Object
    }
  },
  components: {
    DiagramItem
  },
  computed: {
    items() {
      return store.getters.diagramItemsFromStory(this.story)
    }
  }
}

</script>
