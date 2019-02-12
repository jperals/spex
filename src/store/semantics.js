const semantics = {
  state: {
    lastAddedRelationshipId: null,
    nextId: 0,
    relationships: {}
  },
  getters: {
    lastAddedRelationshipId: (state) => state.lastAddedRelationshipId,
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
      state.lastAddedRelationshipId = textFragment.id
    }
  },
  actions: {
    addSemanticRelationship(context) {
      const id = context.state.nextId.toString()
      context.commit('addSemanticRelationship')
      return id
    },
    setRelationship(context, relationship) {
      context.commit('setRelationship', relationship)
    },
  }
}

export default semantics
