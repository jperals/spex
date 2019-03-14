<template>
  <div class="view home-view">
    <top-bar title="Stories"></top-bar>
    <div class="main">
      <div class="welcome-text">👋 Welcome to Profi</div>

      <div class="welcome-image">
        <a @click="createNewStory">
          <label class="new-story-button">NEW STORY</label>
        </a>
      </div>
      <div class="small-title">STORIES</div>
      <hr class="divider">
      <router-link
          :to="'/story/' + story.id"
          class="story-list-item"
          v-for="story in stories"
          :key="story.id"
      >
        <div class="story-icon">📕</div>
        <div class="storyTitle">{{story.title}}</div>
        <div class="storySecondary">Edited 58 minutes ago</div>
      </router-link>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import './view';
.welcome-text {
  font-size: 40px;
  color: #031b26;
  margin-left: auto;
  margin-right: auto;
  margin-top: 48px;
  font-weight: 800;
  max-width: 590px;
}

.welcome-image {
  background-size: 600px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../assets/icons/Home-Story.png");
  height: 333px;
  width: 600px;
  box-sizing: border-box;
  border-radius: 2px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
}

.new-story-button {
  font-size: 16px;
  font-weight: 800;
  padding-top: 4px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 4px;
  letter-spacing: 0.5px;
  color: white;
  background-color: #56a8d1;
  display: block;
  position: relative;
  margin-left: auto;
  margin-right: 40px;
  top: 270px;
  text-align: center;
  width: 100px;
  border-radius: 2px;
}

.new-story-button:hover {
  background-color: #4b93b8;
  cursor: pointer;
}

hr.divider {
  border-top: 1px solid #f3f6f7;
  width: 600px;
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
}

.story-list-item {
  width: 600px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 16px;
  display: block;
}

.story-list-item:hover {
  background-color: #f3f6f7;
  cursor: pointer;
}

.story-icon {
  /* background-size: 36px;
  background-position: center;
  background-repeat: no-repeat; */
  /* background-image: url("../assets/icons/story1.png"); */
  height: 60px;
  width: 36px;
  margin-left: 16px;
  margin-right: 8px;
  display: inline-block;
  font-size: 24px;
}

.storyTitle {
  font-size: 24px;
  color: #031b26;
  line-height: 32px;
  display: inline-block;
  margin-top: -8px;
  margin-left: 8px;
  position: absolute;
}

.storySecondary {
  font-size: 18px;
  color: #707679;
  line-height: 26px;
  display: inline-block;
  position: absolute;
  margin-left: 8px;
  margin-top: 25px;
}

.small-title {
  font-weight: 800;
  margin-bottom: 0px;
  padding-top: 16px;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  font-size: 14px;
  color: #707679;
  letter-spacing: 1px;
  line-height: 32px;
}
</style>


<script>
import store from "@/store";
import TopBar from "@/components/TopBar";

export default {
  name: "home-view",
  components: {
    TopBar
  },
  computed: {
    stories() {
      return store.getters.stories;
    }
  },
  methods: {
    createNewStory() {
      store.dispatch('addNewStory')
        .then(id => {
          this.$router.push('/story/' + id)
        })
    }
  }
};
</script>
