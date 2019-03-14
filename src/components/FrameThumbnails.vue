<template>
  <div class="frames">
    <FrameThumbnail v-for="frame in frames" :key="frame.id" :frame="frame"></FrameThumbnail>
    <FrameThumbnailPlaceholder :story="story"></FrameThumbnailPlaceholder>
  </div>
</template>

<style scoped>
.frames {
  flex-direction: row;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
import FrameThumbnail from "@/components/FrameThumbnail";
import FrameThumbnailPlaceholder from "@/components/AddNewFrame";
import store from "@/store";
export default {
  name: "frame-thumbnails",
  components: {
    FrameThumbnail,
    FrameThumbnailPlaceholder
  },
  props: {
    frames: {
      type: Array
    },
    storyId: {
      type: String
    }
  },
  computed: {
    story() {
      return store.getters.storyById(this.storyId);
    }
  }
};
</script>

<docs>
  ```jsx
  <frame-thumbnails :frames="[{title: 'Frame title', 'description': 'Frame description', 'imageUrl': 'https://www.ixds.com/system/files/styles/image_in_content/private/media-images/_mg_9342.jpg?itok=q3uo0o-H'}, {'title': 'Frame title', 'description': 'Frame description'}, {'title': 'Frame title', 'description': 'Frame description'}]"/>
  ```
</docs>
