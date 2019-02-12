<template>
  <modal>
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
  }
};
</script>
