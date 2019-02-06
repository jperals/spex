<template>
  <textarea
      ref="textarea"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      @click="updateSelection"
      :placeholder="placeholder"
      rows="4"
      maxlength="295"
  ></textarea>
</template>

<style>

</style>

<script>
import store from '@/store'
export default {
  name: 'smart-description',
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  methods: {
    updateSelection() {
      const textarea = this.$refs.textarea
      store.commit('setSelection', {
        start: textarea.selectionStart,
        end: textarea.selectionEnd
      })
    }
  }
}
</script>

<docs>
  ```jsx
  <smart-description v-model="'This is a smart description where text fragments can be related to components in the system'" :placeholder="'Placeholder'" />
  ```
</docs>
