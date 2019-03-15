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
          <div class="add-item" @click="addItemToDiagram(component)" v-if="systemMode"> &lt; Add</div>
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

$light-bg-color: #f2f6f7;
$highlighted-bg-color: #e6eaf1;
$warning-color: #db4141;

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
  background-color: $light-bg-color;
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

.component-name,
.add-item {
  padding: 6px 16px;
  font-size: 15px;
  line-height: 26px;
}

.component-name {
  display: block;
  position: relative;
  box-sizing: border-box;
  border-bottom: $border-default;
  /*margin-left: 8px;*/
  /*padding-left: 8px;*/
  /*padding-right: 20px;*/
  /*margin-right: 8px;*/

  /*margin-bottom: 16px;*/
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /*border-radius: 3px;*/
  background-color: $light-bg-color;
  &:hover {
    background-color: $highlighted-bg-color;
  }
}

.component {
  position: relative;
}

.add-item {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  transition: transform .3s;
  border-radius: 3px 0 0 3px;
  background-color: $light-bg-color;
  &:hover {
    background-color: $highlighted-bg-color;
  }
}

.component.missing {
  position: relative;
  &:after {
    position: absolute;
    top: 0px;
    left: 0px;
    content: "";
    width: 4px;
    height: 100%;
    border-radius: 0px;
    background-color: $warning-color;
  }
  &:hover .add-item {
    transform: translateX(-100%);
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
    systemMode: {
      type: Boolean,
      default: false
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
    addItemToDiagram(component) {
      store.dispatch('addDiagramItem', {
        componentId: component.id
      })
    },
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
