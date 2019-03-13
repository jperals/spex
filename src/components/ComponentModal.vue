<template>
  <modal @modal-click="cancel">
    <component-form :component="component" class="component-form"></component-form>
  </modal>
</template>

<style>
.component-form {
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
import ComponentForm from "./ComponentForm";
import Modal from "./Modal";
import store from '@/store'

export default {
  name: "component-modal",
  components: {
    ComponentForm,
    Modal
  },
  props: {
    component: {
      type: Object
    }
  },
  methods: {
    cancel() {
      store.dispatch("openComponent");
    }
  }
};
</script>
