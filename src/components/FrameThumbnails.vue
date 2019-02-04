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
      frames: {
        type: Array
      },
      storyId: {
        type: String,
        default: '0'
      }
    },
    computed: {
      story() {
        return store.getters.storyById(this.storyId)
      }
    }
  }
</script>
