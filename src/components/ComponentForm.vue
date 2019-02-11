<template>
  <div class="component-form">
    <span class="title">New Component</span>
    <div class="row name-field">
      <label class="label">NAME</label>
      <input
        type="text"
        class="name-text-box"
        v-model="component.name"
        placeholder="Give your component a name..."
      >
    </div>
    <div class="row description-field">
      <label class="label">DESCRIPTION</label>
      <textarea
        class="description-text-box"
        v-model="component.description"
        placeholder="Describe your component..."
        style="height:144px;"
      ></textarea>
    </div>
    <div class="row alias-field">
      <label class="label">ALIAS</label>
      <textarea
        class="alias-text-box"
        v-model="component.description"
        placeholder="What other words do people use to describe this component?"
      ></textarea>
    </div>
    <div class="row mandatory-field">
      <label class="mandatory-label">
        <label class="label">STATUS</label>
        <div class="container">
          <input type="checkbox" class="checkbox" v-model="component.mandatory">
          <span class="mandatory-text">This component is mandatory</span>
          <input type="checkbox">
          <span class="checkmark"></span>
        </div>
        <!-- <span class="mandatory-text">Mandatory</span> -->
      </label>
    </div>
    <div class="row buttons">
      <button @click="save">Save</button>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input {
  display: inline-block;
  width: 736px;
  font-size: 20px;
  color: #031b26;
  line-height: 32px;
  padding-left: 8px;
  padding-top: 0px;
}

textarea {
  display: inline-block;
  width: 736px;
  font-size: 20px;
  color: #031b26;
  line-height: 32px;
  padding-left: 8px;
  padding-top: 8px;
}

/* .mandatory-checkbox {
  width: 40px;
  height: 40px;
} */

.title {
  font-size: 24px;
  color: #031b26;
  font-weight: 800;
  margin-left: 32px;
  margin-top: 24px;
  display: inline-block;
}

.component-form {
  background-color: #f2f6f7;
  width: 800px;
  height: 680px;
}

.label {
  font-weight: 800;
  margin-bottom: 8px;
  padding-top: 16px;
  margin-left: 16px;
  font-family: TitilliumWeb-Bold;
  font-size: 14px;
  color: #707679;
  letter-spacing: 1px;
  line-height: 32px;
  margin-left: 32px;
  display: inline-block;
  margin-right: 100px;
}

.name-text-box {
  width: 736px;
  margin-left: 32px;
  height: 40px;
  border: none;
  resize: none;
  display: inline-block;
}

.description-text-box {
  height: 144px;
  width: 736px;
  margin-left: 32px;
  height: 40px;
  border: none;
  resize: none;
  display: inline-block;
}

.alias-text-box {
  width: 736px;
  margin-left: 32px;
  height: 40px;
  border: none;
  resize: none;
  display: inline-block;
}

::placeholder {
  color: #a9adaf;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
}

.categoryDropdown {
  position: relative;
  display: inline-block;
}

.categoryDropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.categoryDropdown:hover .categoryDropdown-content {
  display: block;
}

/* Customize the label (the container) */
.container {
  display: block;
  position: absolute;
  padding-left: 32px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.mandatory-text {
  position: relative;
  left: 48px;
  top: 8px;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  width: 40px;
  background-color: #fff;
  margin-left: 32px;
  margin-right: 32px;
  display: block;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #e1e4e6;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #56a8d1;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 15px;
  top: 6px;
  width: 8px;
  height: 18px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

input:focus {
  outline: none !important;
  border-color: #56a8d1;
  box-shadow: 0 0 10px #56a8d1;
}
textarea:focus {
  outline: none !important;
  border-color: #56a8d1;
  box-shadow: 0 0 10px #56a8d1;
}
</style>

<script>
import store from "@/store";
export default {
  name: "component-form",
  props: {
    component: {
      type: Object
    }
  },
  methods: {
    save() {
      store.dispatch("addComponent", this.component);
      store.commit("editComponent");
    },
    cancel() {
      store.commit("editComponent");
    }
  }
};
</script>

<docs>
  ```jsx
  <component-form :component="{name: '', description: ''}"/>
  ```
</docs>

