<template>
  <div class="placeholder" @click="addNewFrame">
    <div class="newFrame"></div>
  </div>
</template>

<style scoped lang="scss">
@import "./frame-thumbnail-size.scss";

.placeholder {
  display: flex;
  align-items: center;
  width: $frame-thumbnail-width;
  height: $frame-thumbnail-height;
  cursor: pointer;

  .newFrame {
    width: 2px;
    height: 100px;
  }
  &:hover {
    background-image: url("../assets/icons/newFrame.png");
    background-repeat: no-repeat;
    background-position: left;
  }
}
</style>

<script>
import store from "@/store";
export default {
  name: "frame-thumbnail-placeholder",
  props: {
    story: {
      type: Object
    }
  },
  methods: {
    addNewFrame() {
      store.commit("addNewFrame", this.story);
    }
  }
};
</script>
