<template>
  <div class="view frame-view" v-if="frame">
    <top-bar :story="story"></top-bar>
    <div class="top" v-if="frame">
      <div class="picture-frame image" ref="dragAndDropArea">
        <FrameImage :image-url="imageUrl" :placeholder="'Describe what happens in this frame'"></FrameImage>
        <input v-if="!imageUrl" type="file" class="picture-input" @change="handleFileSelect" ref="fileInput">
      </div>
      <div class="text">
        <input class="title" v-model="frame.title" placeholder="Frame Title">
        <smart-description v-model="frame.description"></smart-description>
      </div>
    </div>
    <frame-selector :frames="storyFrames" :currentFrameId="frameId"></frame-selector>
    <component-list v-if="showComponents" :components="components"></component-list>
  </div>
</template>

<style scoped lang="scss">
.title {
  font-weight: 800;
  font-size: 40px;
  width: 624px;
  outline: none;
  color: #031b26;
  border: none;
  line-height: 40px;
  text-overflow: ellipsis;
}

.picture-frame {
  height: 333px;
  width: 600px;
  background-image: url("../assets/icons/noImage.png");
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #f2f6f7;
  border-radius: 2px;
  box-sizing: border-box;
  margin: auto;
  margin-top: 48px;
  position: relative;
}

.picture-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  width: 100%;
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
  overflow: hidden;
  text-overflow: ellipsis;
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
import ComponentList from '@/components/ComponentList.vue'
import FrameImage from '@/components/FrameImage.vue'
import FrameSelector from '@/components/FrameSelector.vue'
import TopBar from "@/components/TopBar.vue";
import SmartDescription from '@/components/SmartDescription.vue'
import store from '@/store.js'

export default {
  name: 'frame',
  data() {
    return {
      imageUrl: null,
      changeTrack: 1
    }
  },
  props: {
    frameId: {
      type: String
    }
  },
  components: {
    ComponentList,
    FrameImage,
    FrameSelector,
    SmartDescription,
    TopBar
  },
  computed: {
    components() {
      return {
        list: store.getters.components
      }
    },
    frame() {
      return this.changeTrack && store.getters.frameById(this.frameId)
    },
    showComponents() {
      return store.getters.showComponents
    },
    story() {
      return store.getters.storyFromFrame(this.frame)
    },
    storyFrames() {
      return this.changeTrack && store.getters.framesFromSameStory(this.frame)
    }
  },
  mounted() {
    this.updateImageUrl()
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
      this.changeTrack += 1
      this.imageUrl = this.frame.imageUrl
    }
  },
  watch: {
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

