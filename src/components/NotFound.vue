<template>
  <div class="not-found">
    <div v-if="waitingForContent">Loading...</div>
    <div v-else>
      <p class="title">⚠️ Not found</p>
      <router-link to="/">Back to home</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .not-found {
    margin-left: 2em;
    .title {
      font-size: 130%;
    }
  }
</style>

<script>
import store from '@/store'
export default {
  name: 'not-found',
  computed: {
    waitingForContent() {
      return typeof store.getters.waitingForContent
    }
  }
}
</script>

<docs>
  ```jsx
  <not-found></not-found>
  ```
</docs>