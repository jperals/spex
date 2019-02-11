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
    removeRelationship(state, textFragment) {
      delete state.relationships[textFragment.id]
    },
    setRelationship(state, {textFragment, component}) {
      state.relationships[textFragment.id] = component.id
      state.changeTracker += 1
    }
  }
}

export default semantics
