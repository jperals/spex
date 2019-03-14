<template>
  <DiagramArrow :from="position1" :to="position2" :distance-before="100" :distance-after="50"></DiagramArrow>
</template>

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
  }
}
</script>
