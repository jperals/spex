<template>
  <div class="component form">
    <div class="row name-gield">
      <input type="text" class="name-text" v-model="component.name"/>
    </div>
    <div class="row description-field">
      <label class="description-label">
        Description
      </label>
      <textarea class="description-text" v-model="component.description"></textarea>
    </div>
    <div class="row mandatory-field">
      <label class="mandatory-label">
        <input type="checkbox" class="mandatory-checkbox" v-model="component.mandatory">
        <span class="mandatory-text">Mandatory</span>
      </label>
    </div>
    <div class="row aliases-field">
      <label class="aliases-label">
        <textarea class="aliases-text" v-model="component.aliases"></textarea>
      </label>
    </div>
    <div class="row buttons">
      <button @click="save">
        Save
      </button>
      <button @click="cancel">
        Cancel
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import store from '@/store'
export default {
  name: 'component-form',
  props: {
    component: {
      type: Object
    }
  },
  methods: {
    save() {
      store.dispatch('addComponent', this.component)
      store.commit('editComponent')
    },
    cancel() {
      store.commit('editComponent')
    }
  }
}
</script>

<docs>
  ```jsx
  <component-form :component="{name: 'Example component', description: 'This is an example component'}"/>
  ```
</docs>

