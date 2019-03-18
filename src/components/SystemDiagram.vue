<template>
  <div class="system-diagram" v-if="story" @mousemove="moveNewArrow" @click="setRelationship">
    <diagram-arrow v-if="newRelationship" :from="newRelationship.from.position"
                   :to="newRelationship.to" :distance-before="distanceBeforeNewArrow" :distanceAfter="distanceAfterNewArrow" :class="{dimmed: !arrowAttached}"></diagram-arrow>
    <div class="diagram-relationships">
      <diagram-relationship :relationship="relationship" v-for="relationship in relationships"
                            :key="relationship.id"></diagram-relationship>
    </div>
    <div class="diagram-items">
      <diagram-item :item="item" v-for="item in items" :key="item.id"></diagram-item>
    </div>
  </div>
</template>

<style lang="scss" scoped>

// Layout
.system-diagram {
  height: 100%;
  position: relative;
}

.diagram-items {
  height: 100%;
}

.diagram-item,
.diagram-relationship {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
}

.diagram-arrow {
  top: 0;
}

// UX
.diagram-arrow.dimmed {
  opacity: 0.5;
}

</style>

<script>
import DiagramArrow from '@/components/DiagramArrow'
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
  data() {
    return {
      baseCoordinates: {x: 0, y: 0},
      mouseCoordinates: {x: 0, y: 0}
    }
  },
  components: {
    DiagramArrow,
    DiagramItem,
    DiagramRelationship
  },
  computed: {
    arrowAttached() {
      return !!(store.getters.hoveredDiagramItem)
    },
    distanceAfterNewArrow() {
      if (store.getters.hoveredDiagramItem) {
        return 50
      } else {
        return 0
      }
    },
    distanceBeforeNewArrow() {
      return 100
    },
    items() {
      return store.getters.diagramItemsFromStory(this.story)
    },
    relationships() {
      return store.getters.diagramRelationshipsFromStory(this.story)
    },
    newRelationship() {
      const newRelationship = store.getters.newDiagramRelationship
      if (typeof newRelationship === 'object' && newRelationship !== null && typeof newRelationship.from === 'object') {
        let targetCoordinates
        if (store.getters.hoveredDiagramItem) {
          targetCoordinates = store.getters.hoveredDiagramItem.position
        } else {
          targetCoordinates = {
            x: this.mouseCoordinates.x - this.baseCoordinates.x,
            y: this.mouseCoordinates.y - this.baseCoordinates.y
          }
        }
        const arrow = Object.assign(newRelationship, {
          to: targetCoordinates
        })
        return arrow
      }
      return null
    }
  },
  mounted() {
    if (this.$el && typeof this.$el.getBoundingClientRect === 'function') {
      const box = this.$el.getBoundingClientRect()
      this.baseCoordinates = {x: box.left, y: box.top}
    }
  },
  methods: {
    moveNewArrow(event) {
      if (store.getters.newDiagramRelationship) {
        this.mouseCoordinates = {
          x: event.x,
          y: event.y
        }
      }
    },
    setRelationship(event) {
      if (event.target.classList.contains('add-relationship-button')) {
        this.mouseCoordinates = {
          x: event.x,
          y: event.y
        }
      } else {
        store.dispatch('unsetNewDiagramRelationship')
      }
    }
  }
}

</script>
