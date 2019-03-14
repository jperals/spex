<template>
  <div class="component-list">
    <div class="header">Components <button @click="createNewComponent" class="newButton"></button></div>

      <div class="components">
        <div
        class="component"
        v-for="component in components.list"
        :key="component.id"
        :class="{missing: isMissing(component)}"
      >
        <label v-if="selecting" class="component-entry" @click="select(component, $event)">
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

  </div>
</template>

<style scoped lang="scss">
@import "../common-styles/vars";

input:checked {
  background-color: pink;
}

.header {
  font-size: 12px;
  line-height: 24px;
  font-weight: 900;
  text-transform: uppercase;
  color: #707679;
  letter-spacing: 0.25px;
  padding: 8px 16px 6px;
  border-bottom: $border-default;
  background-color: rgba(221,223,223,0.1);
  /*margin-bottom: 8px;*/
  /*padding-top: 16px;*/
  /*margin-left: 16px;*/
}

/* Customize the label (the container) */
.component-entry {
  display: block;
  /* position: absolute; */
  /*padding-left: 40px;*/
  /*margin-bottom: 16px;*/
  border-bottom: $border-default;
  cursor: pointer;
  /*font-size: 16px;*/
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.component-entry input[type="radio"] {
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
.component-entry:hover input ~ .checkmark {
  background-color: #818c92;
}

/* When the radio button is checked, add a blue background */
.component-entry input:checked ~ .checkmark {
  background-color: #56a8d1;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.component-entry input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.component-entry .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

.component-list {
  position: absolute;
  top: 64px;
  right: 0px;
  background-color: #FAFAFA;
  border-left: $border-default;
  width: 250px;
  min-height: 100%;
}

.newButton {
  position: absolute;
  top: 12px;
  right: 16px;
  background-color: transparent;
  width: 16px;
  height: 16px;
  background-image: url("../assets/icons/add.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  display: inline-block;
  border: none;
  outline: none;
  border-radius: 2px;
}

.newButton:hover {
  /*background-color: #417f9e;*/
}

.component-name {
  display: block;
  position: relative;
  box-sizing: border-box;
  padding: 6px 16px 8px 0;
  margin-left: 16px;
  border-bottom: $border-default;
  /*margin-left: 8px;*/
  /*padding-left: 8px;*/
  /*padding-right: 20px;*/
  /*margin-right: 8px;*/

  /*margin-bottom: 16px;*/
  cursor: pointer;
  font-size: 15px;
  line-height: 26px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /*border-radius: 3px;*/
  &:hover {
    background-color: rgba(0, 0, 150, 0.05);
  }
}

.component.missing {
  position: relative;
  &:before {
    position: absolute;
    top: 13px;
    left: 0;
    content: "";
    width: 4px;
    height: 14px;
    border-radius: 0px;
    background-color: #7C3AFF;
    border-radius: 0 2px 2px 0;
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
