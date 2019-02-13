<template>
  <div class="home">
    <top-bar title="ProFi MVP"></top-bar>
    <h2>Stories</h2>
    <ul>
      <li v-for="story in stories" :key="story.id">
        <router-link :to="'/story/' + story.id">
          {{story.title}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '@/store'
import TopBar from '@/components/TopBar'

export default {
  name: "home",
  components: {
    TopBar
  },
  computed: {
    stories() {
      return store.getters.stories
    }
  }
};
</script>
