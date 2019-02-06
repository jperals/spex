<template>
  <textarea
      refs="textarea"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      placeholder="Describe what happens in this frame"
      rows="4"
      maxlength="295"
  ></textarea>
</template>

<style>

</style>

<script>
export default {
  name: 'smart-description',
  props: ['value']
}
</script>

<docs>

</docs>
