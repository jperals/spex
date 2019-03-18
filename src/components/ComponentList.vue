<template>
  <div class="component-list">
    <div class="header">Components
      <button @click="createNewComponent" class="newButton"></button>
    </div>

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
        <div v-else class="component-entry">
          <span class="component-name" @click="openComponent(component)">
            {{component.name}}
          </span>
          <div class="add-item" @click="addItemToDiagram(component)" v-if="systemMode">Add</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import "../common-styles/vars";

$light-bg-color: #f2f6f7;
$highlighted-bg-color: #e6eaf1;
$warning-color: #db4141;

//
// Colors and borders

.component-list {
  background-color: $light-bg-color;
}

.component {
  background-color: $light-bg-color;
  border-bottom: $border-default;
}

.header {
  color: #707679;
  border-bottom: $border-default;
  background-color: rgba(221, 223, 223, 0.1);
}

.checkmark {
  background-color: #e5e8e9;
  &:after {
    background: white;
  }
}

.add-item {
  background-color: $light-bg-color;
  border-radius: 3px;
  border: $border-default;
  color: $gray-transparent-4;
}

.component.missing:after {
  background-color: #7C3AFF;
  border-radius: 0 2px 2px 0;
}

//
// Layout and fonts

.component-list {
  min-height: 100%;
  min-width: 250px;
}

.component-entry {
  width: 100%;
  display: flex;
  align-items: center;
  .component-name {
    flex-grow: 1;
  }
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
  display: flex;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-left: 16px;
  padding: 9px;
  box-sizing: border-box;
  /* Create the indicator (the dot/circle - hidden when not checked) */
  &:after {
    content: '';
    display: block;
    border-radius: 50%;
    background: white;
    width: 100%;
    height: 100%;
  }
}

.header {
  font-size: 12px;
  line-height: 24px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.25px;
  padding: 8px 16px 6px;
}

.component-name {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  padding: 6px 16px;
  font-size: 15px;
  line-height: 26px;
  cursor: pointer;
  user-select: none;
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

.add-item {
  font-size: 12px;
  height: 1em;
  margin-right: 10px;
  line-height: 1em;
  padding: 4px;
}

.component.missing {
  position: relative;
  &:after {
    position: absolute;
    top: 13px;
    left: 0;
    content: "";
    width: 4px;
    height: 14px;
  }
}

//
// UX

/* Customize the label (the container) */
.component-entry {
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: $highlighted-bg-color;
  }
}

.add-item:hover {
  background-color: $gray-transparent-1;
  color: $gray-transparent-5;
}

/* On mouse-over, add a grey background color */
.component-entry:hover input ~ .checkmark {
  background-color: #818c92;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  display: none;
}

/* When the radio button is checked, add a blue background */
.component-entry input:checked ~ .checkmark {
  background-color: #56a8d1;
  /* Show the indicator (dot/circle) when checked */
  &:after {
    display: block;
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
      const component = store.getters.newComponent({story: this.story});
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
      if (store.getters.focusedElement === 'smartText') {
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
