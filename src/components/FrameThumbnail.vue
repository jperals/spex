<template>
  <div class="frame-thumbnail">
    <div class="picture"></div>
    <input class="title" v-model="frame.title" placeholder="Point title">
  </div>
</template>

<style scoped lang="scss">
  .frame-thumbnail {
    display: inline-block;
    width: 300px;
    .picture {
      height: 200px;
      width: 100%;
      border: 1px solid lightgray;
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