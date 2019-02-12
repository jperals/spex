<template>
  <div class="component-form">
    <span class="title">New Component</span>
    <div class="row name-field">
      <label class="label">NAME</label>
      <input
        type="text"
        class="name-text-box"
        v-model="componentCopy.name"
        placeholder="Give your component a name..."
      >
    </div>
    <div class="row description-field">
      <label class="label">DESCRIPTION</label>
      <textarea
        class="description-text-box"
        v-model="componentCopy.description"
        placeholder="Describe your component..."
        style="height:144px;"
      ></textarea>
    </div>
    <div class="row alias-field">
      <label class="label">ALIAS</label>
      <textarea
        class="alias-text-box"
        v-model="componentCopy.aliases"
        placeholder="What other words do people use to describe this component?"
      ></textarea>
    </div>
    <div class="row mandatory-field">
      <label class="label">STATUS</label>
      <div class="container">
        <label class="container">
          <input type="checkbox" class="checkbox" v-model="componentCopy.mandatory">
          <span class="mandatory-text">This component is mandatory</span>
          <input type="checkbox">
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
    <div class="row buttons">
      <button @click="save" class="primaryButton">SAVE</button>
      <button @click="cancel" class="secondaryButton">CANCEL</button>
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
  height: 634px;
  border-radius: 2px;
}

.label {
  font-weight: 800;
  padding-top: 16px;
  font-family: TitilliumWeb-Bold;
  font-size: 14px;
  color: #707679;
  letter-spacing: 1px;
  line-height: 32px;
  margin-left: 32px;
  display: inline-block;
  width: 100%;
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

/* Customize the label (the container) */
.container {
  display: inline-block;
  position: absolute;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 700px;
}

.mandatory-text {
  position: relative;
  left: 80px;
  top: 8px;
  width: 400px;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
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
  display: inline-block;
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
  box-shadow: 0px 0px 10px #56a8d1;
}
textarea:focus {
  outline: none !important;
  border-color: #56a8d1;
  box-shadow: 0 0 10px #56a8d1;
}

.primaryButton {
  background-color: #56a8d1;
  border: none;
  color: white;
  padding: 8px 24px;
  text-align: center;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  float: right;
  margin-right: 24px;
  transition: all 0.3s;
  outline: none;
  border-radius: 2px;
}

.primaryButton:hover {
  background-color: #417f9e;
}

.primaryButton:active {
  background-color: #366b85;
}

.secondaryButton {
  background-color: transparent;
  border: none;
  color: #707679;
  padding: 8px 24px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  float: right;
  transition: all 0.3s;
  outline: none;
}

.secondaryButton:hover {
  color: #031b26;
}

.buttons {
  margin-top: 68px;
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
  data() {
    return {
      componentCopy: Object.assign({}, this.component)
    }
  },
  methods: {
    save() {
      store.dispatch("saveComponent", this.componentCopy);
      store.dispatch("editComponent");
    },
    cancel() {
      store.dispatch("editComponent");
    }
  }
};
</script>

<docs>
  ```jsx
  <component-form :component="{name: '', description: ''}"/>
  ```
</docs>

