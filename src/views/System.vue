<template>
  <div class="view system-view">
    <top-bar :back-url="backUrl" :title="topBarTitle"></top-bar>
    <div class="main">
      System view
    </div>
  </div>
</template>

<style>

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
