<template>
  <div class="view frame-view" @click="toggleSelection(false)">
    <top-bar :story="story" :back-url="'/story/' + story.id"></top-bar>
    <div v-if="frame" class="top">
      <div class="picture-frame image" ref="dragAndDropArea" :class="{empty: !imageUrl}">
        <input type="file" class="picture-input" @change="handleFileSelect" ref="fileInput">
        <FrameImage :image-url="imageUrl" v-if="imageUrl"></FrameImage>
        <label class="chooseButton">CHOOSE FILE</label>
      </div>
      <div class="text">
        <input class="title" v-model="frame.title" placeholder="Frame Title">
        <smart-description
          v-model="frame.description"
          :frame="frame"
          :placeholder="'Describe what happens in this frame'"
        ></smart-description>
      </div>
      <component-list :class="{active:showComponents}" :components="components" :frame="frame" :linked="linkedComponents" :story="story"></component-list>
    </div>
    <div v-else class="top not-found">
      <not-found></not-found>
    </div>
    <frame-selector v-if="storyFrames" :frames="storyFrames" :currentFrameId="frameId"></frame-selector>
  </div>
</template>

<style scoped lang="scss">
.view {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

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

.frame-image {
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  position: absolute;
  pointer-events: none;
}

.picture-frame:not(.empty):not(:hover) label {
  display: none;
}

.picture-frame {
  height: 333px;
  width: 600px;
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
  display: table;
  margin: 0 auto;
  width: 100%;
}

.text {
  max-width: 600px;
  margin: auto;
  margin-top: 24px;
}

.frame-selector {
  height: 100px;
  background-color: #f2f6f7;
}

.frame-selector.frames {
  height: 100px;
  width: 100%;
  background-color: #f2f6f7;
  position: fixed;
  bottom: 0;
}

.component-list {
  /* float: right; */
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  -webkit-­transition: all 0.3s ease;
  -moz-­transition: all 0.3s ease;
  ­-o-­transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.component-list:not(.active) {
  transform: translateX(100%);
}
.frame-image {
  background-color: black;
}

.picture-input {
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  /* opacity: 0; */
  /* overflow: hidden; */
  position: absolute;
  /* z-index: -1; */
}

.picture-input:after {
  content: "";
  display: block;
  background-size: 160px;
  margin: auto;
  object-fit: scale-down;
  background-color: #f3f6f7;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  position: absolute;
  background-image: url("../assets/icons/noImageEmptyState.png");
  background-repeat: no-repeat;
  background-position: center;
  border: 2px solid #56a8d1;
  border-radius: 2px;
}

.chooseButton {
  font-size: 16px;
  font-weight: 800;
  padding-top: 4px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 4px;
  letter-spacing: 0.5px;
  color: white;
  background-color: #56a8d1;
  display: block;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  top: 270px;
  text-align: center;
  width: 100px;
  pointer-events: none;
  border-radius: 2px;
  cursor: pointer; /* "hand" cursor */
}

.chooseButton:hover {
  background-color: #4b93b8;
}

.picture-input:focus {
  outline: none;
}

.picture-input:hover {
  cursor: pointer;
}

.top {
  flex-grow: 1;
  position: relative;
  z-index: 20;
}

.picture-input:focus ~ label,
.picture-input ~ label:hover {
  background-color: #417f9e;
  outline: none;
}

.picture-input ~ label {
  cursor: pointer; /* "hand" cursor */
}
</style>

<script>
import ComponentList from "@/components/ComponentList.vue";
import FrameImage from "@/components/FrameImage.vue";
import FrameSelector from "@/components/FrameSelector.vue";
import NotFound from '@/components/NotFound.vue'
import TopBar from "@/components/TopBar.vue";

import SmartDescription from "@/components/SmartDescription.vue";
import store from "@/store.js";

export default {
  name: "frame",
  data() {
    return {
      changeTrack: 1
    };
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
    NotFound,
    SmartDescription,
    TopBar
  },
  computed: {
    components() {
      return {
        list: store.getters.componentsFromStory(this.story)
      };
    },
    frame() {
      return this.changeTrack && store.getters.frameById(this.frameId);
    },
    imageUrl() {
      return this.frame.imageUrl
    },
    linkedComponents() {
      return store.getters.linkedComponents(this.story)
    },
    showComponents() {
      return store.getters.showComponents;
    },
    story() {
      return store.getters.storyFromFrame(this.frame);
    },
    storyFrames() {
      return this.changeTrack && store.getters.framesFromSameStory(this.frame);
    }
  },
  mounted() {
    const dragAndDropArea = this.$refs.dragAndDropArea;
    if (!dragAndDropArea) {
      console.warn("Drag and drop area not found");
      return;
    }
    dragAndDropArea.addEventListener("dragenter", dragenter, false);
    dragAndDropArea.addEventListener("dragover", dragover, false);
    dragAndDropArea.addEventListener("drop", this.drop, false);
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
      store
        .dispatch("addImageToFrame", {
          frame: this.frame,
          imageFile: file
        })
        .then(this.updateImageUrl);
    },
    handleFiles(files) {
      this.handleFile(files[0]);
    },
    handleFileSelect(event) {
      this.handleFiles(event.target.files);
    },
    toggleSelection(value) {
      console.log(3)
      store.dispatch("toggleSelection", value);
    }
  },
  watch: {
    'frame.description'(description) {
      store.dispatch('sendFrameProperties', {frame: this.frame, props: {description}})
    },
    'frame.title'(title) {
      store.dispatch('sendFrameProperties', {frame: this.frame, props: {title}})
    }
  }
};

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}
</script>

