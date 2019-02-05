<template>
  <div class="frame-image" :style="backgroundImageStyle"></div>
</template>

<style lang="scss" scoped>
  .frame-image {
    background-size: cover;
    background-position: center;
    height: 100%;
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

