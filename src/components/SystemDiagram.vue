<template>
  <div class="system-diagram">
    <div class="diagram-relationships">
      <diagram-relationship :relationship="relationship" v-for="relationship in relationships" :key="relationship.id"></diagram-relationship>
    </div>
    <div class="diagram-items">
      <diagram-item :item="item" v-for="item in items" :key="item.id" ></diagram-item>
    </div>
  </div>
</template>

<style lang="scss" scoped>

// Layout
.system-diagram {
  position: relative;
  .diagram-item,
  .diagram-relationship {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
  }
}

</style>

<script>
import DiagramItem from '@/components/DiagramItem'
import DiagramRelationship from '@/components/DiagramRelationship'
import store from '@/store'
export default {
  name: 'system-diagram',
  props: {
    story: {
      type: Object
    }
  },
  components: {
    DiagramItem,
    DiagramRelationship
  },
  computed: {
    items() {
      return store.getters.diagramItemsFromStory(this.story)
    },
    relationships() {
      return store.getters.diagramRelationshipsFromStory(this.story)
    }
  }
}

</script>
