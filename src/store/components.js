export class Component {
  constructor(props) {
    this.id = components.state.nextId.toString()
    components.state.nextId += 1
    if (props && props.story) {
      this.storyId = props.story.id
    }
    Object.assign(this, props)
  }
}

// Note:
// We are not using Components as being story-specific for now.

const components = {
  state: {
    components: [],
    nextId: 0
  },
  getters: {
    componentById: state => id => state.components.find(component => component.id === id),
    componentDescription: (state, getters) => componentId => {
      const component = getters.componentById(componentId)
      return component.description
    },
    components: state => state.components,
    newComponent: () => () => {
      return {
        title: '',
        description: '',
        aliases: ''
      }
    }
  },
  mutations: {
    addComponent(state, {component}) {
      state.components.push(new Component(component))
    },
    updateComponent(state, {component, newProperties}) {
      Object.assign(component, newProperties)
    }
  },
  actions: {
    // The component will be added
    addComponent(context, component) {
      context.commit('addComponent', {component})
    },
    // The component exists and will be modified
    updateComponent(context, {component, newProperties}) {
      context.commit('updateComponent', {
        component,
        newProperties
      })
    },
    // The component might exist or not.
    // Add to the components if it's not there;
    // modify the corresponding component if we already have it
    saveComponent(context, properties) {
      const matchingComponent = context.getters.componentById(properties.id)
      if (matchingComponent) {
        context.dispatch('updateComponent', {
          component: matchingComponent,
          newProperties: properties
        })
      } else {
        context.dispatch('addComponent', {properties})
      }
    }
  }
}

export default components
