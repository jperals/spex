<template>
  <div class="frame-selector">
    <router-link
      :to="'/frame/' + frame.id"
      class="frame"
      v-for="frame in frames"
      :key="frame.id"
      :class="{active: isCurrent(frame)}"
    >
      <frame-image :image-url="frame.imageUrl"></frame-image>
      <div class="frame-title" v-if="frame.title">{{ frame.title }}</div>
      <!-- <div class="frame-description">
            {{ frame.description }}
      </div>-->
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.frame-selector {
  display: flex;
  padding-left: 24px;
  align-items: center;

  .frame {
    /* padding: 0 16 0 16; */
    margin-left: 24px;
    width: 120px;
    height: 68px;
    position: relative;
    &.active:after {
      content: " ";
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(165, 136, 223, 0.3);
      cursor: default;
    }
  }
  .frame-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #979c9e;
    box-sizing: border-box;
  }
  .frame-title {
    font-weight: 800;
    font-size: 14pt;
    margin-left: 6px;
    margin-top: 6px;
    max-width: 100px;
    line-height: 28px;
    color: white;
    display: none;
  }
  .frame:not(.active):hover {
    /* border: 2px solid #56a8d1; */
    .frame-image {
      background-color: rgba(3, 27, 38, 0.8);
    }
    .frame-title {
      display: inline-block;
      align: center;
    }
  }
}
</style>

<script>
import FrameImage from "@/components/FrameImage.vue";
export default {
  name: "frame-selector",
  props: {
    currentFrameId: {
      type: String
    },
    frames: {
      type: Array,
      default: () => []
    }
  },
  components: {
    FrameImage
  },
  methods: {
    isCurrent(frame) {
      return frame.id === this.currentFrameId;
    }
  }
};
</script>

<docs>
  ```jsx
  <frame-selector :current-frame-id="'2'" :frames="[{title: 'Frame title', 'description': 'Frame description', 'imageUrl': 'https://www.ixds.com/system/files/styles/image_in_content/private/media-images/_mg_9342.jpg?itok=q3uo0o-H'}, {'title': 'Frame title', 'description': 'Frame description'}, {'title': 'Frame title', 'description': 'Frame description', id: '2'}, {title: 'Frame title'}]" />
  ```
</docs>