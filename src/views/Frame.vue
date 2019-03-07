<template>
  <div class="view frame-view" @click="toggleSelection(false)">
    <top-bar :story="story" :back-url="'/story/' + story.id"></top-bar>
    <div v-if="frame" class="main top">
      <image-upload @upload="handleFile" :image-url="frame.imageUrl"></image-upload>
      <div class="text">
        <input class="title" v-model="frame.title" placeholder="Frame Title">
        <smart-description
          v-model="frame.description"
          :frame="frame"
          :placeholder="'Describe what happens in this frame'"
        ></smart-description>
      </div>
      <component-list
        :class="{active:showComponents}"
        :components="components"
        :frame="frame"
        :linked="linkedComponents"
        :story="story"
      ></component-list>
    </div>
    <div v-else class="top not-found">
      <not-found></not-found>
    </div>
    <frame-selector v-if="storyFrames" :frames="storyFrames" :currentFrameId="frameId"></frame-selector>
  </div>
</template>

<style scoped lang="scss">
@import './view';
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

.text {
  max-width: 600px;
  margin: auto;
  margin-top: 24px;
}

.frame-selector {
  background-color: #f2f6f7;
}

.frame-selector.frames {
  height: 100px;
  width: 100%;
  background-color: #f2f6f7;
  position: fixed;
  bottom: 0;
}

.component-list:not(.active) {
  transform: translateX(100%);
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

.top {
  z-index: 20;
}

</style>

<script>
import ComponentList from "@/components/ComponentList.vue";
import FrameSelector from "@/components/FrameSelector.vue";
import ImageUpload from '@/components/ImageUpload'
import NotFound from "@/components/NotFound.vue";
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
    FrameSelector,
    ImageUpload,
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
      return this.frame.imageUrl;
    },
    linkedComponents() {
      return store.getters.linkedComponents(this.story);
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
  methods: {
    handleFile(file) {
      store
        .dispatch("addImageToFrame", {
          frame: this.frame,
          imageFile: file
        })
    },
    toggleSelection(value) {
      store.dispatch("toggleSelection", value);
    }
  },
  watch: {
    "frame.description"(description) {
      store.dispatch("sendFrameProperties", {
        frame: this.frame,
        props: { description }
      });
    },
    "frame.title"(title) {
      store.dispatch("sendFrameProperties", {
        frame: this.frame,
        props: { title }
      });
    }
  }
};
</script>

