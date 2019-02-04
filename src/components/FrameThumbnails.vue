<template>
  <div class="frames">
    <FrameThumbnail v-for="frame in frames" :key="frame.id" :frame="frame"></FrameThumbnail>
    <FrameThumbnailPlaceholder :story="story"></FrameThumbnailPlaceholder>
  </div>
</template>

<style scoped>
  .frames {
    display: flex;
    flex-direction: row;
  }
</style>

<script>
  import FrameThumbnail from '@/components/FrameThumbnail'
  import FrameThumbnailPlaceholder from '@/components/FrameThumbnailPlaceholder'
  import store from '@/store'
  export default {
    name: 'frame-thumbnails',
    components: {
      FrameThumbnail,
      FrameThumbnailPlaceholder
    },
    props: {
      storyId: {
        type: Number,
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
