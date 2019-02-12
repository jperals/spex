<template>
  <div class="smart-text">
    <div class="smart-text"
         contenteditable
         ref="textarea"
         v-bind:value="value"
         @click="updateSelection"
         @input="onInput"
         v-on:mousemove="onMouseMove($event)"
         @mouseout="onMouseOut"
         :placeholder="placeholder"
         rows="4"
         maxlength="295"
    ></div>
    <div class="tooltip" ref="tooltip" :style="tooltipStyle">
      {{tooltipText}}
    </div>
  </div>
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
      tooltipText: '',
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
  computed: {
    lastAddedRelationshipId() {
      return store.getters.lastAddedRelationshipId
    },
    tooltipStyle() {
      const x = 0
      const y = 0
      return `transform: translate(${x},${y})`
    }
  },
  methods: {
    onInput() {
      this.$emit('input', this.$refs.textarea.innerHTML)
    },
    onMouseMove(event) {
      if (event && event.target && typeof event.target.getAttribute('link-id') === 'string') {
        const linkId = event.target.getAttribute('link-id')
        const linkedElementId = store.getters.relationship({id: linkId})
        if (typeof linkedElementId !== 'undefined') {
          const text = store.getters.componentDescription(linkedElementId)
          if (typeof text === 'string') {
            this.tooltipText = text
          }
        }
      }
    },
    onMouseOut() {
      this.tooltipText = ''
    },
    updateContent() {
      const textarea = this.$refs.textarea
      textarea.innerHTML = this.value
      this.changeTracker += 1;
    },
    toggleSelection(value) {
      console.log(value)
    },
    async updateSelection(event) {
      event.stopPropagation()
      const selection = document.getSelection()
      if (!selection || !(selection.toString()) || !(selection.toString().length)) {
        store.commit('toggleSelection', false)
        return
      }
      let id = selection.anchorNode && selection.anchorNode.parentElement && selection.anchorNode.parentElement.attributes && selection.anchorNode.parentElement.getAttribute('link-id')
      if (id === null || typeof id === 'undefined') {
        id = await store.dispatch('addSemanticRelationship')
      }
      store.commit("setSelection", {id});
      store.commit('setFocus', 'smartText')
      store.commit('toggleSelection', true)
      this.changeTracker += 1;
    },
    setRelationship(relationshipId) {
      const selection = document.getSelection()
      if (!selection || !(selection.toString()) || !(selection.toString().length)) {
        store.commit('toggleSelection', false)
        return
      }
      const currentText = selection.toString()
      const html = `<span class="smart-link" link-id="${relationshipId}">${currentText}</span>`
      document.execCommand('insertHTML', false, html)
      store.commit("setSelection", {id: relationshipId});
      store.commit('setFocus', 'smartText')
      store.commit('toggleSelection', true)
      this.changeTracker += 1;
    }
  },
  watch: {
    lastAddedRelationshipId(value) {
      console.log('relatinoshipTracker')
      this.setRelationship(value)
    },
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
