<template>
  <div class="diagram-relationship">
    <DiagramArrow :from="position1" :to="position2" :distance-before="distanceBeforeArrow" :distance-after="distanceAfterArrow"
                  @removeRelationship="removeRelationship"></DiagramArrow>
  </div>
</template>

<style scoped>
.diagram-relationship {

}

.remove-element {

}
</style>

<script>
import DiagramArrow from '@/components/DiagramArrow'
import store from '@/store'

export default {
  name: 'diagram-relationship',
  props: {
    relationship: {
      type: Object
    }
  },
  data() {
    return {
      distanceAfterArrow: 50,
      distanceBeforeArrow: 100
    }
  },
  components: {
    DiagramArrow
  },
  computed: {
    position1() {
      return store.getters.diagramItemById(this.relationship.from.itemId).position
    },
    position2() {
      return store.getters.diagramItemById(this.relationship.to.itemId).position
    },
  },
  methods: {
    removeRelationship() {
      store.dispatch('removeDiagramRelationship', this.relationship)
    }
  }
}
</script>
