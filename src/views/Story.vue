<template>
  <div class="view story-view">
    <top-bar :story="story" :back-url="'/'"></top-bar>
    <div class="main" v-if="story">
      <div class="story-fields">
        <input v-model="story.title" placeholder="Give your story a title">
        <textarea
            v-model="story.description"
            placeholder="Write a short description"
            maxlength="95"
        ></textarea>
      </div>
      <div class="thumbnails">
        <FrameThumbnails :story-id="storyId" :frames="frames" v-if="frames"></FrameThumbnails>
      </div>
      <component-list :components="components" :linked="linkedComponents" :story="story"
                      :class="{active:showComponents}"></component-list>
    </div>
    <div v-else>
      <not-found></not-found>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
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
  position: relative;
  flex-grow: 1;
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

.component-list {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  transition: transform 0.3s ease;
  &:not(.active) {
    transform: translateX(100%);
  }
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
    linkedComponents() {
      return store.getters.linkedComponents(this.story)
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
    },
    'story.title'(title) {
      store.dispatch('sendStoryProperties', {
        story: this.story,
        props: {title}
      })
    }
  }
};
</script>
