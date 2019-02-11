<template>
  <div class="view frame-view" v-if="frame" @click="toggleSelection(false)">
    <top-bar :story="story"></top-bar>
    <div class="top" v-if="frame">
      <div class="picture-frame image" ref="dragAndDropArea" :class="{empty: !imageUrl}">
        <input type="file" class="picture-input" @change="handleFileSelect" ref="fileInput">
        <FrameImage :image-url="imageUrl" v-if="imageUrl"></FrameImage>
        <label>Choose a File</label>
      </div>
      <div class="text">
        <input class="title" v-model="frame.title" placeholder="Frame Title">
        <smart-description
            v-model="frame.description"
            :frame="frame"
            :placeholder="'Describe what happens in this frame'"
        ></smart-description>
      </div>
    </div>
    <frame-selector :frames="storyFrames" :currentFrameId="frameId"></frame-selector>
    <component-list :class="{active:showComponents}" :components="components" :frame="frame"></component-list>
  </div>
</template>

<style scoped lang="scss">

.view {
  height: 100vh;
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

.component-list {
  float: right;
  position: fixed;
  top: 65px;
  right: 0;
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

label {
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
  margin: auto;
  top: 263px;
  text-align: center;
  width: 100px;
  pointer-events: none;
  border-radius: 2px;
  cursor: pointer; /* "hand" cursor */
}

.picture-input:focus {
  outline: none;
}

.picture-input:hover {
  cursor: pointer;
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
import TopBar from "@/components/TopBar.vue";

import SmartDescription from "@/components/SmartDescription.vue";
import store from "@/store.js";

export default {
  name: "frame",
  data() {
    return {
      imageUrl: null,
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
    SmartDescription,
    TopBar
  },
  computed: {
    components() {
      return {
        list: store.getters.components
      };
    },
    frame() {
      return this.changeTrack && store.getters.frameById(this.frameId);
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
    this.updateImageUrl();
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
        .dispatch("addImage", {
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
      store.commit('toggleSelection', value)
    },
    updateImageUrl() {
      this.changeTrack += 1;
      this.imageUrl = this.frame.imageUrl;
    }
  },
  watch: {
    "$route.params.frameId"() {
      this.updateImageUrl();
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

