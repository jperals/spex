<template>
  <div class="view story-view">
    <top-bar :story="story"></top-bar>
    <div class="story" v-if="story">
      <div class="top">
        <input v-model="story.title" placeholder="Give your story a title">
        <textarea
          v-model="story.description"
          placeholder="Write a short description"
          maxlength="95"
        ></textarea>
      </div>
      <div class="thumbnails">
        <FrameThumbnails :story-id="storyId" :frames="frames"></FrameThumbnails>
      </div>
    </div>
    <div v-else>
      <not-found></not-found>
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
  text-overflow: ellipsis;
}

input::placeholder,
textarea::placeholder {
  opacity: 0.7;
}

.top {
  margin: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 48px;
  max-width: 600px;
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
  overflow: hidden;
}

.thumbnails {
  margin-left: auto;
  margin-right: auto;
  margin-top: 48px;
}
</style>

<script>
import FrameThumbnails from "@/components/FrameThumbnails";
import NotFound from '@/components/NotFound.vue'
import TopBar from "@/components/TopBar.vue";
import store from "@/store";

export default {
  name: "story",
  components: {
    FrameThumbnails,
    NotFound,
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
