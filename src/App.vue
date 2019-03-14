<template>
  <div id="app">
    <router-view/>
    <component-modal v-if="editingComponent" :component="editingComponent"></component-modal>
  </div>
</template>

<style lang="scss">
@import './common-styles/headings';
body {
  margin: 0;
  verflow-x: hidden;
  overflow-y: auto;
}

a {
  text-decoration: none;
}

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

h3{
  @extend %h3;
}

.button-secondary{

}



</style>

<script>
import store from '@/store'
import ComponentModal from '@/components/ComponentModal'

export default {
  name: 'profi-app',
  components: {
    ComponentModal
  },
  computed: {
    editingComponent() {
      return store.getters.editingComponent
    }
  }
}
</script>