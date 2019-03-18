<template>
  <div class="component-form">
    <div class="main-buttons">
      <div class="button edit-button" title="Edit" v-if="exists" :class="{active: editing}" @click="toggleEdit"></div>
      <div class="button close-button" title="Close" @click="cancel"></div>
    </div>
    <span class="title" v-if="!exists">New Component</span>
    <div class="row name-field">
      <label class="label">NAME</label>
      <input
        type="text"
        class="name-text-box"
        v-model="componentCopy.name"
        placeholder="Give your component a name..."
        :readonly="!editing"
      >
    </div>
    <div class="row description-field">
      <label class="label">DESCRIPTION</label>
      <textarea
        class="description-text-box"
        v-model="componentCopy.description"
        placeholder="Describe your component..."
        style="height:144px;"
        :readonly="!editing"
      ></textarea>
    </div>
    <div class="row icon-field">
      <label class="label">ICON</label>
      <image-upload class="small" :class="{readonly: !editing}" :image-url="componentCopy.imageUrl" @upload="handleFile"></image-upload>
    </div>
    <div class="row alias-field">
      <label class="label">ALIAS</label>
      <textarea
        class="alias-text-box"
        v-model="componentCopy.aliases"
        placeholder="What other words do people use to describe this component?"
        :readonly="!editing"
      ></textarea>
    </div>
    <div class="row mandatory-field">
      <label class="label">STATUS</label>
      <div class="container">
        <label class="container v-center">
          <input type="checkbox" class="checkbox" v-model="componentCopy.mandatory" :disabled="!editing">
          <span class="checkmark"></span>
          <span class="mandatory-text">This component is mandatory</span>
        </label>
      </div>
    </div>
    <div class="row mentioned-field">
      <label class="label">Frames using this</label>
      <frame-selector class="inline" :frames="framesThatLinkToComponent" :add-frame="false"></frame-selector>
    </div>
    <div class="row buttons" :class="{hidden: !editing}">
      <button @click="save" class="primaryButton">SAVE</button>
      <button @click="cancel" class="secondaryButton">CANCEL</button>
      <div class="delete-icon" v-if="exists" @click="remove">
        <div class="delete-label">DELETE COMPONENT</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../common-styles/vars";

//
// Colors and borders

.component-form {
  background-color: #f2f6f7;
}

.main-buttons .button {
  border-radius: 20%;
}

.edit-button {
  background-image: url("../assets/icons/edit.png");
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
}

//
// Layout and fonts

.component-form {
  width: 800px;
  max-height: 100%;
  overflow-y: auto;
  border-radius: 2px;
  padding: 24px 24px 24px 32px;
  position: relative;
}

.main-buttons {
  position: absolute;
  right: 20px;
  top: 20px;
  .button {
    display: inline-block;
    width: 20px;
    height: 20px;
    padding: 8px;
    &:not(:first-child) {
      margin-left: 8px;
    }
  }
}

.picture-frame {
  width: 40px;
  height: 40px;
}

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
  display: inline-block;
  margin-bottom: 16px;
}

.label {
  font-weight: 800;
  padding-top: 16px;
  font-size: 14px;
  color: #707679;
  letter-spacing: 1px;
  line-height: 32px;
  display: inline-block;
  width: 100%;
  text-transform: uppercase;
}

.name-text-box {
  width: 736px;
  height: 40px;
  border: none;
  resize: none;
  display: inline-block;
}

.description-text-box {
  width: 736px;
  height: 40px;
  border: none;
  resize: none;
  display: inline-block;
}

.alias-text-box {
  width: 736px;
  height: 40px;
  border: none;
  resize: none;
  display: inline-block;
}


//
// Interaction

.component-form {
  .main-buttons .button {
    cursor: pointer;
    &.active,
    &:hover {
      background-color: rgba(0, 0, 150, 0.05);
      color: #666;
    }
    &:not(.active):not(:hover) {
      opacity: 0.4;
    }
  }
}

input[readonly=readonly],
textarea[readonly=readonly] {
  background-color: transparent;
  &:focus {
    outline: none;
  }
}

input:not([readonly=readonly]):focus,
textarea:not([readonly=readonly]):focus {
  outline: none !important;
  border-color: $color-blue-highlight;
  box-shadow: 0px 0px 10px $color-blue-highlight;
}

//
// To be sorted

::placeholder {
  color: #a9adaf;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
}

/* Customize the label (the container) */
.container {
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
  display: inline-block;
  position: relative;
}

/* Hide the browser's default checkbox */
.container input {
  display: none;
}

/* Create a custom checkbox */
.checkmark {
  height: 40px;
  width: 40px;
  background-color: #fff;
  margin-right: 32px;
  display: inline-block;
  position: relative;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #e1e4e6;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #56a8d1;
}

/* When the checkmark is disabled (not editing), gray it out a bit */
input[type=checkbox][disabled=disabled] ~.checkmark {
  opacity: 0.6;
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
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
}

.delete-icon {
  background-image: url("../assets/icons/delete.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left;
  display: inline-block;
  /* position: absolute; */
  height: 24px;
  opacity: 0.8;
  cursor: pointer;
}

.delete-label {
  width: 200px;
  margin-left: 32px;
  font-weight: 600;
  color: #707679;
}

.delete-icon:hover {
  opacity: 1;
}

.v-center {
  display: flex;
  flex-direction: row;
  align-items: center;
}

label + .container {
  margin-top: 12px;
}

</style>

<script>
import FrameSelector from '@/components/FrameSelector'
import ImageUpload from '@/components/ImageUpload'
import store from "@/store";

export default {
  name: "component-form",
  props: {
    component: {
      type: Object
    }
  },
  data() {
    const componentCopy = Object.assign(store.getters.newComponent({story: this.component && this.component.story || undefined}), this.component)
    return {
      componentCopy,
      editing: typeof componentCopy.id === 'undefined'
    };
  },
  components: {
    FrameSelector,
    ImageUpload
  },
  computed: {
    framesThatLinkToComponent() {
      return store.getters.framesThatLinkToComponent(this.component)
    },
    exists() {
      return typeof this.componentCopy.id !== 'undefined'
    }
  },
  methods: {
    cancel() {
      store.dispatch("openComponent");
    },
    handleFile(file) {
      store
        .dispatch('addImageToComponent', {
          component: this.componentCopy,
          imageFile: file
        })
    },
    remove() {
      store.dispatch('removeComponent', this.componentCopy)
        .then(() => {
          store.dispatch('openComponent')
        })
    },
    save() {
      store.dispatch("saveComponent", this.componentCopy);
      store.dispatch("openComponent");
    },
    toggleEdit() {
      this.editing = !(this.editing)
    }
  }
};
</script>

<docs>
  ```jsx
  <component-form :component="{name: '', description: ''}"/>
  ```
</docs>

