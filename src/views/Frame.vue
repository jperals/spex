<template>
  <div class="view frame-view" v-if="frame">
    <top-bar :story="story"></top-bar>
    <div class="top" v-if="frame">
      <div class="picture-frame" ref="dragAndDropArea">
        <div v-if="imageUrl">
          <img ref="frameImage" :src="imageUrl">
        </div>
        <div v-else>
          <input type="file" class="picture-input" @change="handleFileSelect" ref="fileInput">
        </div>
      </div>
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
    data() {
      return {
        imageUrl: null
      }
    },
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
      story() {
        return store.getters.storyFromFrame(this.frame)
      },
      storyFrames() {
        return store.getters.framesFromSameStory(this.frame)
      }
    },
    mounted() {
      this.updateImageUrl(this.frame.image)
      const dragAndDropArea = this.$refs.dragAndDropArea
      if (!dragAndDropArea) {
        console.warn('Drag and drop area not found')
        return
      }
      dragAndDropArea.addEventListener('dragenter', dragenter, false)
      dragAndDropArea.addEventListener('dragover', dragover, false)
      dragAndDropArea.addEventListener('drop', this.drop, false)
    },
    methods: {
      drop(event) {
        event.stopPropagation();
        event.preventDefault();
        const dt = event.dataTransfer;
        const files = dt.files;
        this.handleFiles(files);
      },
      handleFile(file) {
        store.commit('addImage', {
          frame: this.frame,
          image: file
        })
        this.updateImageUrl(file)
      },
      handleFiles(files) {
        this.handleFile(files[0])
      },
      handleFileSelect(event) {
        this.handleFiles(event.target.files);
      },
      updateImageUrl(file) {
        if(file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            this.imageUrl = e.target.result
          }
          reader.readAsDataURL(file)
        } else {
          this.imageUrl = null
        }
      }
    },
    watch: {
      frame(frame) {
        if(frame) {
          this.updateImageUrl(frame.image)
        }
      }
    }
  }

  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }
</script>

