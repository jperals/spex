<template>
  <div class="addNewFrame" @click="addNewFrame">
    <div class="newFrame"></div>
  </div>
</template>

<style scoped lang="scss">
@import "./frame-thumbnail-size.scss";

.addNewFrame {
  display: inline-block;
  align-items: center;
  width: $frame-thumbnail-width;
  height: $frame-thumbnail-height;
  cursor: pointer;
  vertical-align: 120px;

  .newFrame {
    width: 2px;
    height: 100px;
  }
  &:hover {
    background-image: url("../assets/icons/newFrame.png");
    background-repeat: no-repeat;
    background-position: left;
    margin-top: -16px;
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
      store.dispatch("addNewFrame", this.story);
    }
  }
};
</script>

<docs>
  ```js
  <frame-thumbnail-add/>
  ```
</docs>