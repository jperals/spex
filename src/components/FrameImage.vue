<template>
  <div class="frame-image" :class="{empty: !imageUrl}" :style="backgroundImageStyle"></div>
</template>

<style lang="scss" scoped>
.frame-image {
  background-size: cover;
  background-position: center;
  height: 100%;
  border: 2px solid #979c9e;
  box-sizing: border-box;
  border-radius: 2px;
  &.empty {
    background-image: url("../assets/icons/noImage.png");
    background-size: 24px;
    background-repeat: no-repeat;
    background-color: #f2f6f7;
    border-radius: 2px;
  }
}
</style>

<script>
export default {
  name: "frame-image",
  props: {
    imageUrl: {
      type: String
    }
  },
  computed: {
    backgroundImageStyle() {
      if (!this.imageUrl) {
        return {};
      }
      return {
        "background-image": "url(" + this.imageUrl + ")"
      };
    }
  }
};
</script>

<docs>
  ```jsx
  <frame-image :image-url="'https://www.ixds.com/system/files/styles/image_in_content/private/media-images/_mg_9342.jpg?itok=q3uo0o-H'" style="height: 500px"></frame-image>
  ```
</docs>

