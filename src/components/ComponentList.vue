<template>
  <div class="component-list">
    <div class="header">COMPONENTS</div>
      <div class="components">
        <div
        class="component"
        v-for="component in components.list"
        :key="component.id"
        :class="{missing: isMissing(component)}"
      >
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
          <span class="component-name" @click="openComponent(component)">
            {{component.name}}
          </span>
        </div>
      </div>
    </div>
    <button @click="createNewComponent" class="newButton">NEW</button>
  </div>
</template>

<style scoped lang="scss">
@import "./vars";

input:checked {
  background-color: pink;
}

.header {
  font-weight: 800;
  margin-bottom: 8px;
  padding-top: 16px;
  margin-left: 16px;
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
  min-height: 100%;
}

.newButton {
  background-color: #56a8d1;
  border: none;
  color: white;
  padding: 8px 24px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 16px;
  margin: 12px auto;
  transition: all 0.3s;
  outline: none;
  border-radius: 2px;
}

.newButton:hover {
  background-color: #417f9e;
}

.component-name {
  display: block;
  box-sizing: border-box;
  margin-left: 8px;
  padding-left: 8px;
  padding-right: 20px;
  margin-right: 8px;
  position: relative;
  margin-bottom: 16px;
  cursor: pointer;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 3px;
  &:hover {
    background-color: rgba(0, 0, 150, 0.05);
  }
}

.component.missing {
  position: relative;
  &:before {
    position: absolute;
    top: 0px;
    left: 0px;
    content: "";
    width: 4px;
    height: 100%;
    border-radius: 0px;
    background-color: #db4141;
  }
}

</style>


<script>
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
    missing: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    createNewComponent() {
      const component = store.getters.newComponent({ story: this.story });
      this.openComponent(component);
    },
    openComponent(component) {
      store.dispatch("openComponent", component);
    },
    isMissing(component) {
      return this.missing.map(component => component.id).includes(component.id);
    },
    isSelected(component) {
      const relatedComponentId = store.getters.selectedTextComponentId;
      return relatedComponentId === component.id;
    },
    select(component, event) {
      event.stopPropagation();
      // Use stopPropagation
      // to avoid losing the text selection if the smart text field is focused.
      // https://stackoverflow.com/a/20759988
      if(store.getters.focusedElement === 'smartText') {
        event.preventDefault()
      }
      store.dispatch("setFocus", "componentList");
      store.dispatch("toggleSelection", true);
      store.dispatch("setRelationship", component.id);
    }
  },
  computed: {
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
