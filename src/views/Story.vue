<template>
  <div class="view story-view">
    <top-bar></top-bar>
    <div class="story" v-if="story">
      <div class="top">
        <input v-model="story.title" placeholder="Give your story a title">
        <textarea v-model="story.description" placeholder="Write a short description"></textarea>
      </div>
      <div class="thumbnails">
        <FrameThumbnails :story-id="storyId" :frames="frames"></FrameThumbnails>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
input {
  font-weight: 800;
  font-size: 40px;
  width: 624px;
  outline: none;
  color: #031b26;
  border: none;
  line-height: 40px;
}

input::placeholder,
textarea::placeholder {
  opacity: 0.7;
}

.top {
  margin-left: 422px;
  margin-top: 48px;
  max-width: 590px;
}

textarea {
  font-weight: 400;
  font-size: 28px;
  width: 590px;
  outline: none;
  color: #031b26;
  border: none;
  margin-top: 8px;
  line-height: 38px;
  resize: none;
  position: relative;
}

.thumbnails {
  margin-left: 218px;
  margin-top: 48px;
}
</style>

<script>
import TopBar from "@/components/TopBar.vue";
import FrameThumbnails from "@/components/FrameThumbnails";
import store from "@/store";

export default {
  name: "story",
  components: {
    FrameThumbnails,
    TopBar
  },
  props: {
    storyId: {
      type: String
    }
  },
  computed: {
    frames() {
      return store.getters.framesFromStory(this.story);
    },
    story() {
      return store.getters.storyById(this.storyId);
    }
  }
};
</script>
