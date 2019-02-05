<template>
  <div class="view frame-view" v-if="frame">
    <top-bar :story="story"></top-bar>
    <div class="top" v-if="frame">
      <div class="picture-frame image" ref="dragAndDropArea">
        <FrameImage :image-url="imageUrl" v-if="imageUrl"></FrameImage>
        <div v-else>
          <input type="file" class="picture-input" @change="handleFileSelect" ref="fileInput">
        </div>
      </div>
      <div class="text">
        <input v-model="frame.title" placeholder="Frame Title">
        <textarea
            v-model="frame.description"
            placeholder="Describe what happens in this frame"
            rows="4"
        ></textarea>
    </div>
    </div>
    <frame-selector :frames="storyFrames" :currentFrameId="frameId"></frame-selector>
  </div>
</template>

<style scoped lang="scss">
input {
  font-weight: 800;
  font-size: 40px;
  width: 624px;
  outline: none;
  color: #031b26;
  border: none;
  line-height: 40px;
}

.image {
  height: 333px;
  width: 600px;
  border: 2px solid #979c9e;
  background-image: url("../assets/icons/noImage.png");
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #f2f6f7;
  border-radius: 2px;
  box-sizing: border-box;
  margin: auto;
  margin-top: 48px;
}

.text {
  max-width: 600px;
  margin: auto;
  margin-top: 24px;
}

textarea {
  font-weight: 400;
  font-size: 20px;
  width: 590px;
  outline: none;
  color: #031b26;
  border: none;
  margin-top: 8px;
  line-height: 28px;
  resize: none;
  position: relative;
}

.frame-selector {
  height: 100px;
  width: 100%;
  background-color: #f2f6f7;
  position: fixed;
  bottom: 0;
}

.frame-selector.frames {
  height: 100px;
  width: 100%;
  background-color: #f2f6f7;
  position: fixed;
  bottom: 0;
}
</style>

<script>
  import store from '@/store.js'
  import FrameImage from '@/components/FrameImage.vue'
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
      FrameImage,
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
        store.dispatch('addImage', {
          frame: this.frame,
          imageFile: file
        })
          .then(this.updateImageUrl)
      },
      handleFiles(files) {
        this.handleFile(files[0])
      },
      handleFileSelect(event) {
        this.handleFiles(event.target.files);
      },
      updateImageUrl() {
        this.imageUrl = this.frame.imageUrl
      }
    },
    watch: {
      frame() {
        this.updateImageUrl()
      },
      '$route.params.frameId'() {
        this.updateImageUrl()
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

