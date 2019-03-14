<template>
  <div id="app">
    <router-view/>
    <component-modal v-if="editingComponent" :component="editingComponent"></component-modal>
  </div>
</template>

<style lang="scss">
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
  color: #031b26;
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
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