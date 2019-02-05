<template>
  <div class="view frame-view">
    <top-bar :story="story"></top-bar>
    <div class="top" v-if="frame">
      <div class="picture-frame"></div>
    </div>
    <div class="text">
      <input v-model="frame.title" placeholder="Frame Title">
      <textarea
        v-model="frame.description"
        placeholder="Describe what happens in this frame"
        rows="4"
        maxlength="295"
      ></textarea>
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
  text-overflow: ellipsis;
}

.picture-frame {
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
import store from "@/store.js";
import FrameSelector from "@/components/FrameSelector.vue";
import TopBar from "@/components/TopBar.vue";
export default {
  name: "frame",
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
      return store.getters.frameById(this.frameId);
    },
    story() {
      return store.getters.storyFromFrame(this.frame);
    },
    storyFrames() {
      return store.getters.framesFromSameStory(this.frame);
    }
  }
};
</script>
