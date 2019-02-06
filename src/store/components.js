// Note:
// Components are not story-specific.

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

const components = {
  state: {
    components: [],
    nextId: 0
  },
  getters: {
    components: state => state.components
  },
  mutations: {
    addComponent(state, {component}) {
      state.components.push(component)
    }
  }
}

export default components
