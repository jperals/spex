<template>
  <div class="component-list">
    <div class="component" v-for="component in components.list" :key="component.id">
      <label>
        <input type="radio" :value="component.id" v-model="components.selected">
        <span class="component-name">{{component.name}}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  name: 'component-list',
  props: {
    components: {
      type: Object
    }
  }
}
</script>

<docs>
  ```jsx
  <component-list
      :components="{list: [{id: '0', name: 'VR goggles'}, {id: '1', name: 'AR glasses'}, {id: '2', name: 'Tray'}, {id: '3', name: 'Robot'}, {id: '4', name: 'MOTO MH-6'}], selected: '2'}"/>
</docs>
