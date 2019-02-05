<template>
  <img :src="imageUrl">
</template>

<style lang="scss" scoped>

</style>

<script>
  export default {
    name: 'frame-image',
    props: {
      imageUrl: {
        type: String
      }
    }
  }
</script>

<docs>
  ```jsx
  <frame-image></frame-image>
  ```
</docs>

