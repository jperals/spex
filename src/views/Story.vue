<template>
  <div class="view story-view">
    <top-bar></top-bar>
    <div class="story" v-if="story">
      <div class="top">
        <input
          v-model="story.title"
          placeholder="Give your story a title"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Give your story a title'"
        >

        <textarea
          v-model="story.description"
          placeholder="Write a short description"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Write a short description'"
        ></textarea>
      </div>
      <FrameThumbnails :story-id="storyId"></FrameThumbnails>
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
  margin-top: 80px;
  line-height: 40px;
}

.top {
  margin-left: 432px;
  margin-top: 80px;
}

textarea {
  font-weight: 400;
  font-size: 28px;
  width: 624px;
  outline: none;
  color: #031b26;
  border: none;
  margin-top: 8px;
  line-height: 38px;
  resize: none;
}
</style>
  
<script>
  import TopBar from '@/components/TopBar.vue'
  import FrameThumbnails from '@/components/FrameThumbnails'
  import store from '@/store'

  export default {
    name: 'story',
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
      story() {
        return store.getters.storyById(this.storyId)
      }
    }
  }
</script>
