<template>
  <div class="frames">
    <FrameThumbnail class="frame" v-for="frame in frames" :key="frame.id" :frame="frame"></FrameThumbnail>
  </div>
</template>

<style>

</style>

<script>
  import FrameThumbnail from '@/components/FrameThumbnail'
  import store from '@/store'
  export default {
    name: 'frame-thumbnails',
    components: {
      FrameThumbnail
    },
    props: {
      storyId: {
        type: String,
        default: 0
      }
    },
    computed: {
      frames() {
        return store.getters.framesFromStory(this.story.id)
      },
      story() {
        return store.getters.storyById(this.storyId)
      }
    }
  }
</script>
