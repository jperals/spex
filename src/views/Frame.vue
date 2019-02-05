<template>
  <div class="view frame-view">
    <top-bar></top-bar>
    <div class="top" v-if="frame">
      <div class="picture-frame"></div>
      <input v-model="frame.title">
      <textarea v-model="frame.description"></textarea>
    </div>
    <frame-selector :frames="storyFrames" :currentFrameId="frameId"></frame-selector>
  </div>
</template>

<style>

</style>

<script>
  import store from '@/store.js'
  import FrameSelector from '@/components/FrameSelector.vue'
  import TopBar from "@/components/TopBar.vue";
  export default {
    name: 'frame',
    props: {
      frameId: {
        type: String
      }
    },
    components: {
      FrameSelector,
      TopBar
    },
    computed: {
      frame() {
        return store.getters.frameById(this.frameId)
      },
      storyFrames() {
        return store.getters.framesFromSameStory(this.frame)
      }
    }
  }
</script>
