<template>
  <div class="addNewFrame" @click="addNewFrame">
    <!-- <div class="newFrame"></div> -->
  </div>
</template>

<style scoped lang="scss">
@import "./frame-thumbnail-size.scss";
@import '../common-styles/vars';

.addNewFrame {
  align-items: center;
  width: $frame-thumbnail-width;
  height: 24px;
  /*height: $frame-thumbnail-height;*/
  cursor: pointer;
  vertical-align: 120px;
  border: 1px solid $gray-transparent-1;
  border-radius: 8px;
  margin-top: 16px;
  opacity: 0.5;
  background-image: url("../assets/icons/add.png");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    background-color:$gray-transparent-1;
    opacity: 1;
  }
}
</style>

<script>
import store from "@/store";
export default {
  name: "frame-thumbnail-add",
  props: {
    story: {
      type: Object
    }
  },
  methods: {
    addNewFrame() {
      store.dispatch("addNewFrameToStory", this.story);
    }
  }
};
</script>

<docs>
  ```js
  <frame-thumbnail-add/>
  ```
</docs>