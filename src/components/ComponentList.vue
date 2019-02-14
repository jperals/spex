<template>
  <div class="component-list">
    <div class="header">COMPONENTS</div>
    <div class="component" v-for="component in components.list" :key="component.id" :class="{missing: isMissing(component)}">
      <label v-if="selecting" class="container" @click="select(component, $event)">
        <input
          type="radio"
          :checked="isSelected(component)"
          :class="{checked: isSelected(component) }"
        >
        <span class="checkmark"></span>
        <span class="component-name">{{component.name}}</span>
      </label>
      <div v-else>
        <span class="component-name" @click="editComponent(component)">
          {{component.name}}
          <div class="edit"></div>
        </span>

        <!-- <button @click="editComponent(component)" class="editButton">Edit</button> -->
      </div>
    </div>
    <button @click="createNewComponent" class="newButton">NEW</button>
    <component-modal v-if="editingComponent" :component="editingComponent"></component-modal>
  </div>
</template>

<style scoped lang="scss">
input:checked {
  background-color: pink;
}

.header {
  font-weight: 800;
  margin-bottom: 8px;
  padding-top: 16px;
  margin-left: 16px;
  font-family: TitilliumWeb-Bold;
  font-size: 14px;
  color: #707679;
  letter-spacing: 1px;
  line-height: 32px;
}

/* Customize the label (the container) */
.container {
  display: block;
  /* position: absolute; */
  padding-left: 40px;
  margin-bottom: 16px;
  cursor: pointer;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input[type="radio"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #e5e8e9;
  border-radius: 50%;
  margin-top: 5px;
  margin-left: 16px;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #818c92;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #56a8d1;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

.component-list {
  background-color: #f2f6f7;
  width: 250px;
  height: 100%;
}

.newButton {
  background-color: #56a8d1;
  border: none;
  color: white;
  padding: 8px 24px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  float: left;
  margin-right: 24px;
  transition: all 0.3s;
  outline: none;
  border-radius: 2px;
  margin-left: 80px;
  position: absolute;
  bottom: 24px;
}

.newButton:hover {
  background-color: #417f9e;
}

.component-name {
  display: block;
  box-sizing: border-box;
  margin-left: 8px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 8px;
  position: relative;
  margin-bottom: 16px;
  cursor: pointer;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.component-name:hover .edit {
  display: block;
}

.edit {
  background-image: url("../assets/icons/edit.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  width: 24px;
  height: 24px;
  margin-right: 24px;
  right: 0;
  bottom: 0px;
  display: none;
}

.component.missing {
  .component-name {
    background-color: rgba(255, 0, 0, 0.125);
    border-radius: 4px;
    &:after {
      position: absolute;
      top: -7px;
      right: -7px;
      content: '';
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: rgb(255, 0, 0);
    }
  }
}
</style>


<script>
import ComponentModal from "./ComponentModal";
import store from "@/store";

export default {
  name: "component-list",
  props: {
    components: {
      type: Object
    },
    story: {
      type: Object
    },
    linked: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ComponentModal
  },
  methods: {
    createNewComponent() {
      const component = store.getters.newComponent({story: this.story});
      this.editComponent(component);
    },
    editComponent(component) {
      store.dispatch("editComponent", component);
    },
    isLinked(component) {
      return this.linked.includes(component.id)
    },
    isMissing(component) {
      const isLinked = this.isLinked(component)
      return component.mandatory && !isLinked
    },
    isSelected(component) {
      const relatedComponentId = store.getters.selectedTextComponentId;
      return relatedComponentId === component.id;
    },
    select(component, event) {
      event.stopPropagation();
      store.dispatch("setFocus", "componentList");
      store.dispatch("toggleSelection", true);
      store.dispatch("setRelationship", component.id);
    }
  },
  computed: {
    editingComponent() {
      return store.getters.editingComponent;
    },
    selecting() {
      return store.getters.selecting;
    }
  }
};
</script>

<docs>
  ```jsx
  <component-list
      :components="{list: [{id: '0', name: 'VR goggles'}, {id: '1', name: 'AR glasses'}, {id: '2', name: 'Tray'}, {id: '3', name: 'Robot'}, {id: '4', name: 'MOTO MH-6'}], selected: '2'}"/>
</docs>
