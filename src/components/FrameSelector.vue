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
$height: 100px;
$frame-height: 68px;
$horizontal-spacing: 24px;
$vertical-padding: ($height - $frame-height)/2;
.frame-selector {
  /* Keep all elements to one line */
  padding-top: $vertical-padding;
  padding-bottom: $vertical-padding;
  //height: $height - $vertical-padding*2;
  .frame {
    /* padding: 0 16 0 16; */
    margin-right: $horizontal-spacing;
    width: 120px;
    height: $frame-height;
    position: relative;
    display: inline-block;
    &.active:after {
      content: " ";
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(165, 136, 223, 0.5);
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
    padding: 6px;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    line-height: 28px;
    position: absolute;
    color: white;
    opacity: 0;
    white-space: normal;
    background-color: rgba(3, 27, 38, 0.7);
  }
  .frame:not(.active):hover {
    /* border: 2px solid #56a8d1; */
    .frame-image {
      background-color: rgba(3, 27, 38, 0.7);
    }
    .frame-title {
      opacity: 1;
    }
  }
}
.frame-selector:not(.inline) {
  .frame {
    margin-bottom: 24px;
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