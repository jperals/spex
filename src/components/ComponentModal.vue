<template>
  <modal>
    <component-form :component="component">
    </component-form>
  </modal>
</template>

<style>

</style>

<script>
import ComponentForm from './ComponentForm'
import Modal from './Modal'

export default {
  name: 'component-modal',
  components: {
    ComponentForm,
    Modal
  },
  props: {
    component: {
      type: Object
    }
  }
}
</script>
