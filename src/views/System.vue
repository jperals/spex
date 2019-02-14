<template>
  <div class="view system-view">
    <top-bar :back-url="backUrl" :title="topBarTitle" :story="story"></top-bar>
    <div class="main" :class="{'with-sidebar': showComponents}">
      <component-list :components="components" :linked="linkedComponents" :story="story"
                      :class="{active:showComponents}"></component-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './view.scss';

.main {
  background-image: url('../assets/icons/grid.png');
  display: flex;
  align-items: center;
  &:before {
    content: '';
    display: block;
    width: 575px;
    height: 577px;
    margin-left: auto;
    margin-right: auto;
    background-image: url('../assets/icons/systemOverview.png');
    background-repeat: no-repeat;
    transition: transform 0.3s ease;
  }
  &.with-sidebar:before {
    transform: translateX(-100px);
  }
}
</style>

<script>
import ComponentList from '@/components/ComponentList'
import store from '@/store'
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
    linkedComponents() {
      return store.getters.linkedComponents(this.story)
    },
    showComponents() {
      return store.getters.showComponents;
    },
    story() {
      return store.getters.storyById(this.$route.params.storyId)
    },
    topBarTitle() {
      if (!(this.story)) {
        return ''
      }
      return this.story.title
    }
  }
}
</script>
