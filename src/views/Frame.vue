<template>
  <div class="view frame-view" @click="toggleSelection(false)">
    <top-bar :story="story"></top-bar>

    <div v-if="frame" class="main top">
      <div class="frame-selector-column">
        <a :href="storyViewUrl">Back to overview</a>
        <frame-selector v-if="storyFrames" :frames="storyFrames" :currentFrameId="frameId"></frame-selector>
      </div>
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
          :missing="missingComponents"
          :story="story"
      ></component-list>
    </div>
    <div v-else class="top not-found">
      <not-found></not-found>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import './view';
@import '../common-styles/vars';
@import '../common-styles/headings';

.title {
  @extend %h3;
  /*font-weight: 800;*/
  /*font-size: 40px;*/
  /*width: 624px;*/
  outline: none;
  /*color: #031b26;*/
  border: none;
  line-height: 40px;
  text-overflow: ellipsis;
  padding: 0;
}

.text {
  @extend %body;
  max-width: 600px;
  margin: 24px auto;
}

.frame-selector-column {
  position: absolute;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  /*$frame-height: 60px;*/
  /*height: calc(100%-64px);;*/

  /*top: 64px;*/
  /*$horizontal-spacing: 24px;*/
  /*$vertical-padding: ($height - $frame-height)/2;*/
  /*height: $height - $vertical-padding*2;*/
  /*padding-left: $horizontal-spacing;*/
  background-color: #FAFAFA;
  border-right: $border-default;
  white-space: nowrap;
  /*overflow-y: hidden;*/
}

component-list {
  position: absolute;
  overflow-y: auto;
  top: 0;
  /*top: 64px;*/
  bottom: 0;
  right: 0;
  background-color: #FAFAFA;
  border-left: $border-default;
  width: 250px;
  min-height: 100%;
  overflow-y: hidden;
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
    missingComponents() {
      return store.getters.missingComponentsFromStory(this.story)
    },
    showComponents() {
      return store.getters.showComponents;
    },
    story() {
      return store.getters.storyFromFrame(this.frame);
    },
    storyFrames() {
      return this.changeTrack && store.getters.framesFromSameStory(this.frame);
    },
    storyViewUrl() {
      return '#/story/' + this.story.id
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
        props: {description}
      });
    },
    "frame.title"(title) {
      store.dispatch("sendFrameProperties", {
        frame: this.frame,
        props: {title}
      });
    }
  }
};
</script>

