<template>
  <div class="view story-view">
    <top-bar></top-bar>
    <div class="story" v-if="story">
      <div class="top">
        <input v-model="story.title">
        <textarea v-model="story.description"></textarea>
      </div>
      <FrameThumbnails :story-id="storyId"></FrameThumbnails>
    </div>
  </div>
</template>

<style>

</style>

<script>
  import TopBar from '@/components/TopBar.vue'
  import FrameThumbnails from '@/components/FrameThumbnails'
  import store from '@/store'

  export default {
    name: 'story',
    components: {
      FrameThumbnails,
      TopBar
    },
    props: {
      storyId: {
        type: String
      }
    },
    computed: {
      story() {
        return store.getters.storyById(this.storyId)
      }
    }
  }
</script>
