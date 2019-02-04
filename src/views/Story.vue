<template>
  <div class="view story-view">
    <top-bar></top-bar>
    <div class="story" v-if="story">
      <div class="top">
        <input v-bind="story.title">
        <textarea v-bind="story.description"></textarea>
      </div>
      <div class="frames">
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
  import TopBar from '@/components/TopBar.vue'
  import store from '@/store'

  export default {
    name: 'story',
    components: {
      TopBar
    },
    props: {
      storyId: {
        type: String
      }
    },
    computed: {
      frames() {
        return store.framesFromStory(this.story.id)
      },
      story() {
        return store.getters.storyById(this.storyId)
      }
    }
  }
</script>
