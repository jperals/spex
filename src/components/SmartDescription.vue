<template>
  <div class="smart-text"
       contenteditable
       ref="textarea"
       v-bind:value="value"
       @input="onInput"
       @click="updateSelection"
       :placeholder="placeholder"
       rows="4"
       maxlength="295"
  ></div>
</template>

<style lang="scss">
$fontSize: 20px;
.smart-text {
  font-weight: 400;
  width: 590px;
  color: #031b26;
  margin-top: 8px;
  line-height: 28px;
  position: relative;
  border: none;
  font-family: "Titillium Web";
  font-size: $fontSize;
  line-height: 28px;
  outline: none;
  padding: 0;
  resize: none;
  text-overflow: ellipsis;
  .smart-link {
    background-color: #e3dfff;
    padding-left: 3px;
    padding-right: 3px;
    border-radius: 3px;
    &:hover {
      background-color: #bfbbd6;
    }
  }
}

</style>

<script>
import store from "@/store";

export default {
  name: "smart-description",
  data() {
    return {
      changeTracker: 1
    };
  },
  props: {
    frame: {
      type: Object
    },
    value: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  mounted() {
    this.updateContent()
  },
  methods: {
    onInput() {
      this.$emit('input', this.$refs.textarea.innerHTML)
      console.log('onInput')
    },
    updateContent() {
      const textarea = this.$refs.textarea
      textarea.innerHTML = this.value
      this.changeTracker += 1;
    },
    toggleSelection(value) {
      console.log(value)
    },
    updateSelection(event) {
      event.stopPropagation()
      this.changeTracker += 1;
      const selection = document.getSelection()
      const currentText = selection.toString()
      if(!currentText || !currentText.length) return
      const id = new Date().getTime()
      const html = `<span class="smart-link" link-id="${id}">${currentText}</span>`
      document.execCommand('insertHTML', false, html)
      store.commit("setSelection", {id});
      store.commit('setFocus', 'smartText')
      store.commit('toggleSelection', true)
    }
  },
  watch: {
    '$route'() {
      this.updateContent()
    }
  }
};
</script>

<docs>
  ```jsx
  <smart-description
      :value="'This is a smart description where text fragments can be related to components in the system'"
      :placeholder="'Placeholder'"/>
  ```
</docs>
