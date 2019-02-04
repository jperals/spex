<template>
  <div class="placeholder" @click="addNewFrame">
    <div class="plus">+</div>
  </div>
</template>

<style scoped lang="scss">
  @import './frame-thumbnail-size.scss';
  .placeholder {
    display: flex;
    align-items: center;
    width: $frame-thumbnail-width;
    height: $frame-thumbnail-height;
    cursor: pointer;
    .plus {
      text-align: center;
      width: 100%;
    }
    &:hover {
      background-color: lightgray;
    }
  }
</style>

<script>
  import store from '@/store'
  export default {
    name: 'frame-thumbnail-placeholder',
    props: {
      story: {
        type: Object
      }
    },
    methods: {
      addNewFrame() {
        store.commit('addNewFrame', this.story)
      }
    }
  }
</script>
