<template>
  <div class="view system-view">
    <top-bar :back-url="backUrl" :story="story"></top-bar>
    <div class="main" :class="{'with-sidebar': showComponents}">
      <system-diagram :story="story"></system-diagram>
      <component-list :components="components" :missing="missingComponents" :story="story"
                      :system-mode="true" :class="{active:showComponents}"></component-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './view.scss';

.main {
  background-image: url('../assets/icons/grid.png');
}
</style>

<script>
import ComponentList from '@/components/ComponentList'
import store from '@/store'
import SystemDiagram from '@/components/SystemDiagram'
import TopBar from '@/components/TopBar'

export default {
  name: 'system-view',
  props: {
    storyId: {
      type: String
    }
  },
  components: {
    ComponentList,
    SystemDiagram,
    TopBar
  },
  computed: {
    backUrl() {
      return this.storyId ? '/story/' + this.storyId : '/'
    },
    components() {
      return {
        list: store.getters.componentsFromStory(this.story)
      }
    },
    missingComponents() {
      return store.getters.missingComponentsInStoryDiagram(this.story)
    },
    showComponents() {
      return store.getters.showComponents;
    },
    story() {
      return store.getters.storyById(this.$route.params.storyId)
    }
  }
}
</script>
