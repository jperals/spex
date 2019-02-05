<template>
  <div class="frame-selector">
    <router-link
      :to="'/frame/' + frame.id"
      class="frame"
      v-for="frame in frames"
      :key="frame.id"
      :class="{active: isCurrent(frame)}"
    >
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
    border: 1px solid #979c9e;
    border-radius: 2px;
  }
  .frame-title {
    font-weight: 800;
    font-size: 16pt;
    margin-left: 6px;
    margin-top: 6px;
    line-height: 28px;
    color: white;
    display: none;
  }
  .frame:hover {
    /* border: 2px solid #56a8d1; */
    background-color: rgba(3, 27, 38, 0.8);
    .frame-title {
      display: inline;
    }
  }
}
</style>

<script>
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
  methods: {
    isCurrent(frame) {
      return frame.id === this.currentFrameId;
    }
  }
};
</script>