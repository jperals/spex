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

  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  name: 'component-form',
  props: {
    component: {
      type: Object
    }
  }
}
</script>

<docs>
  ```jsx
  <component-form :component="{name: 'Example component', description: 'This is an example component'}"/>
  ```
</docs>

