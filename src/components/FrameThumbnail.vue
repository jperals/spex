<template>
  <div class="frame-thumbnail">
    <div class="picture"></div>
    <input
      class="title"
      v-model="frame.title"
      placeholder="Frame Title"
      onfocus="this.placeholder = ''"
      onblur="this.placeholder = 'Frame Title'"
    >
  </div>
</template>

<style scoped lang="scss">
@import "./frame-thumbnail-size";
.frame-thumbnail {
  display: inline-block;
  width: $frame-thumbnail-width;
  margin-right: 20px;
  input::placeholder {
    opacity: 0.7;
  }
  .picture {
    height: $frame-thumbnail-height;
    width: 100%;
    border: 2px solid #979c9e;
    background-image: url("../assets/icons/noImage.png");
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #f2f6f7;
    border-radius: 2px;
    box-sizing: border-box;
  }
  .title {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    margin-top: 8px;
    font-size: 24px;
    font-weight: 400;
    color: #031b26;
    line-height: 32px;
  }
  &:hover .picture,
  &:focus-within .picture {
    border-color: #56A8D1;
  }
}

textarea:focus,
input:focus {
  outline: none;
}
</style>

<script>
export default {
  name: "frame-thumbnail",
  props: {
    frame: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>