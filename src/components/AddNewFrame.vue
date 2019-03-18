<template>
  <div class="addNewFrame" @click="addNewFrame">
    <div class="newFrame"></div>
  </div>
</template>

<style scoped lang="scss">
@import "./frame-thumbnail-size.scss";
@import '../common-styles/vars';

.addNewFrame {
  /*display: block;*/
  align-items: center;
  width: $frame-thumbnail-width;
  height: $frame-thumbnail-height;
  cursor: pointer;
  vertical-align: 120px;
  background-color: $gray-transparent-1;
  border-radius: 8px;

  .newFrame {
    /*background-color: $gray-transparent-1;*/
    /*width: $frame-thumbnail-width;*/
    /*height: $frame-thumbnail-height;*/
    margin: auto;
    width: 24px;
    height: 24px;
    /*background-image: url("../assets/icons/add.png");*/

    /*width: 2px;*/
    /*height: 100px;*/
  }
  &:hover {
    background-image: url("../assets/icons/add.png");
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 16px;
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