<template>
  <div class="view system-view">
    <top-bar :back-url="backUrl" :title="topBarTitle" :story="story"></top-bar>
    <div class="main">
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './view.scss';
.main {
  background-image: url('../assets/icons/grid.png');
  display: flex;
  align-items: center;
  &:empty:after {
    content: '';
    display: block;
    width: 575px;
    height: 577px;
    margin-left: auto;
    margin-right: auto;
    background-image: url('../assets/icons/systemOverview.png');
    background-repeat: no-repeat;
  }
}
</style>

<script>
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
    TopBar
  },
  computed: {
    backUrl() {
      return this.storyId ? '/story/' + this.storyId : '/'
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
