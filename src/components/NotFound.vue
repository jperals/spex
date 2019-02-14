<template>
  <div class="not-found">
    <p class="title">⚠️ Not found</p>
    <router-link to="/">Back to home</router-link>
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
export default {
  name: 'not-found'
}
</script>

<docs>
  ```jsx
  <not-found></not-found>
  ```
</docs>