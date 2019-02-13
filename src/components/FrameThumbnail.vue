<template>
  <div class="frame-thumbnail">
    <router-link :to="'/frame/' + frame.id">
      <frame-image class="picture" :imageUrl="frame.imageUrl"></frame-image>
    </router-link>
    <textarea class="title" v-model="frame.title" placeholder="Frame Title" rows="2" maxlength="27"></textarea>
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
    box-sizing: border-box;
  }
  .title {
    resize: none;
    display: block;
    /* width: 100%; */
    margin-bottom: 48px;
    padding: 0;
    border: none;
    margin-top: 8px;
    font-size: 24px;
    font-weight: 400;
    color: #031b26;
    line-height: 32px;
    height: 64px;
    max-width: 180px;
    /* overflow: hidden; */
  }
  &:hover .picture,
  &:focus-within .picture {
    border-color: #56a8d1;
  }

  textarea:focus,
  input:focus {
    outline: none;
    text-overflow: ellipsis;
  }
}
</style>

<script>
import FrameImage from "@/components/FrameImage.vue";
import store from '@/store'
export default {
  name: "frame-thumbnail",
  props: {
    frame: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    FrameImage
  },
  watch: {
    'frame.title'(title) {
      store.dispatch('sendFrameProperties', {frame: this.frame, props: {title}})
    }
  }
};
</script>

<docs>
  ```jsx
  <frame-thumbnail :frame="{title: 'Frame title', 'description': 'Frame description', 'imageUrl': 'https://www.ixds.com/system/files/styles/image_in_content/private/media-images/_mg_9342.jpg?itok=q3uo0o-H'}"/>
  ```
</docs>
