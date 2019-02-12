export class Component {
  constructor(props) {
    this.id = components.state.nextId.toString()
    components.state.nextId += 1
    if(props && props.story) {
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
    }
  },
  actions: {
    addComponent(context, component) {
      context.commit('addComponent', {component})
    }
  }
}

export default components
