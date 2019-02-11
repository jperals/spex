const semantics = {
  state: {
    changeTracker: 1,
    nextId: 0,
    relationships: {}
  },
  getters: {
    semanticsChangeTracker: (state) => state.changeTracker,
    relationship: (state) => (textFragment) => {
      if (textFragment && typeof textFragment.id !== 'undefined') {
        return state.relationships[textFragment.id]
      }
      return
    }
  },
  mutations: {
    addSemanticRelationship(state) {
      state.nextId += 1
    },
    removeRelationship(state, textFragment) {
      delete state.relationships[textFragment.id]
    },
    setRelationship(state, {textFragment, component}) {
      state.relationships[textFragment.id] = component.id
      state.changeTracker += 1
    }
  },
  actions: {
    addSemanticRelationship(context) {
      const id = context.state.nextId.toString()
      context.commit('addSemanticRelationship')
      return id
    }
  }
}

export default semantics
