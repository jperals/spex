<template>
  <div class="frame-image" :class="{empty: !imageUrl}" :style="backgroundImageStyle"></div>
</template>

<style lang="scss" scoped>
  .frame-image {
    background-size: cover;
    background-position: center;
    height: 100%;
    border: 2px solid #979c9e;
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
    name: 'frame-image',
    props: {
      imageUrl: {
        type: String
      }
    },
    computed: {
      backgroundImageStyle() {
        if(!(this.imageUrl)) {
          return {}
        }
        return {
          'background-image': 'url(' + this.imageUrl + ')'
        }
      }
    }
  }
</script>

<docs>
  ```jsx
  <frame-image></frame-image>
  ```
</docs>

