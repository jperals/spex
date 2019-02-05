<template>
  <div class="frame-selector">
    <div class="frame" v-for="frame in frames" :key="frame.id" :class="{active: isCurrent(frame)}">
      <router-link :to="'/frame/' + frame.id">
        <div class="frame-title" v-if="frame.title">
          {{ frame.title }}
        </div>
        <div class="frame-description">
          {{ frame.description }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .frame-selector {
    .frame {
      display: inline-block;
    }
  }
</style>

<script>
  export default {
    name: 'frame-selector',
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
        return frame.id === this.currentFrameId
      }
    }
  }
</script>