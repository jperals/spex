<template>
  <div class="component-list">
    <div class="header">COMPONENTS</div>
    <div class="component" v-for="component in components.list" :key="component.id">
      <label class="container" @click="select(component)">
        <input type="radio" :checked="isSelected(component)" :class="{checked: isSelected(component) }">
        <span class="component-name">{{component.name}}</span>
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
input:checked {
  background-color: pink
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
  position: relative;
  padding-left: 60px;
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
  top: 0;
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
</style>




<script>
import store from '@/store'
export default {
  name: "component-list",
  props: {
    components: {
      type: Object
    },
    frame: {
      type: Object
    }
  },
  methods: {
    isSelected(component) {
      const selection = store.getters.selection
      const relatedComponentId = store.getters.relationship(selection)
      return relatedComponentId === component.id
    },
    select(component) {
      const selection = store.getters.selection
      store.commit('setRelationship', {
        textFragment: selection,
        component
      })
    }
  }
};
</script>

<docs>
  ```jsx
  <component-list :components="{list: [{id: '0', name: 'VR goggles'}, {id: '1', name: 'AR glasses'}, {id: '2', name: 'Tray'}, {id: '3', name: 'Robot'}, {id: '4', name: 'MOTO MH-6'}], selected: '2'}"/>
</docs>
