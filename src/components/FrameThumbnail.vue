<template>
  <div class="frame-thumbnail">
    <div class="picture"></div>
    <input class="title" v-model="frame.title" placeholder="Point title">
  </div>
</template>

<style scoped lang="scss">
  @import './frame-thumbnail-size';
  .frame-thumbnail {
    display: inline-block;
    width: $frame-thumbnail-width;
    margin-right: 20px;
    .picture {
      height: $frame-thumbnail-height;
      width: 100%;
      border: 1px solid lightgray;
      box-sizing: border-box;
    }
    .title {
      display: block;
      width: 100%;
      padding: 0;
      border: 0;
    }
  }
</style>

<script>
  export default {
    name: 'frame-thumbnail',
    props: {
      frame: {
        type: Object,
        default: () => {
          return {
            title: 'Frame title'
          }
        }
      }
    }
  }
</script>