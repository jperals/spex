<template>
  <div class="view story-view">
    <top-bar :story="story" :back-url="'/'"></top-bar>
    <div class="main" v-if="story">
      <div class="story-fields">
        <textarea
            v-model="story.description"
            placeholder="Write a short description"
            maxlength="95"
        ></textarea>
      </div>
      <div class="thumbnails">
        <FrameThumbnails :story-id="storyId" :frames="frames" v-if="frames"></FrameThumbnails>
      </div>
      <component-list :components="components" :missing="missingComponents" :story="story"
                      :class="{active:showComponents}"></component-list>
    </div>
    <div v-else>
      <not-found></not-found>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './view.scss';

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

.main {
  padding-top: 48px;
}

.story-fields {
  margin-left: auto;
  margin-right: auto;
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
import ComponentList from '@/components/ComponentList'
import FrameThumbnails from "@/components/FrameThumbnails";
import NotFound from "@/components/NotFound.vue";
import TopBar from "@/components/TopBar.vue";
import store from "@/store";

export default {
  name: "story",
  components: {
    ComponentList,
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
    components() {
      return {
        list: store.getters.componentsFromStory(this.story)
      }
    },
    frames() {
      return store.getters.framesFromStory(this.story);
    },
    missingComponents() {
      return store.getters.missingComponentsFromStory(this.story)
    },
    showComponents() {
      return store.getters.showComponents;
    },
    story() {
      return store.getters.storyById(this.storyId);
    }
  },
  watch: {
    'story.description'(description) {
      store.dispatch('sendStoryProperties', {
        story: this.story,
        props: {description}
      })
    }
  }
};
</script>
