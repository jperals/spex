function initialState() {
  return {
    editingComponent: null,
    focusedElement: null,
    lastAddedRelationship: null,
    newDiagramRelationship: null,
    selecting: false,
    showComponents: false,
    selectedTextComponentId: null
  }
}

const ui = {
  state: initialState(),
  getters: {
    editingComponent(state) {
      return state.editingComponent
    },
    focusedElement: (state) => state.focusedElement,
    lastAddedRelationship: (state) => state.lastAddedRelationship,
    selecting(state, getters) {
      return state.selecting && getters.focusedElement === 'smartText' || getters.focusedElement === 'componentList'
    },
    selectedTextComponentId(state) {
      return state.selectedTextComponentId
    },
    newDiagramRelationship(state) {
      return state.newDiagramRelationship
    },
    showComponents(state) {
      return state.showComponents
    }
  },
  mutations: {
    openComponent(state, component) {
      state.editingComponent = component
    },
    setFocus(state, elementId) {
      state.focusedElement = elementId
    },
    setRelationship(state, id) {
      state.lastAddedRelationship = id
    },
    setSelectedComponentId(state, selection) {
      state.selectedTextComponentId = selection
    },
    setNewDiagramRelationship(state, payload) {
      state.newDiagramRelationship = payload
    },
    toggleComponents(state, value) {
      state.showComponents = typeof value === 'undefined' ? !state.showComponents : value
    },
    toggleSelection(state, value) {
      state.selecting = typeof value === 'undefined' ? !state.selecting : value
    },
    unsetNewDiagramRelationship(state) {
      state.newDiagramRelationship = null
    },
    unsetSelection(state) {
      state.textSelection = null
    },
    updateNewDiagramRelationship(state, newProperties) {
      Object.assign(state.newDiagramRelationship, newProperties)
    }
  },
  actions: {
    addNewDiagramRelationship(context, value) {
      context.commit('setNewDiagramRelationship', value)
    },
    openComponent(context, component) {
      context.commit('openComponent', component)
    },
    setFocus(context, focusedElement) {
      context.commit('setFocus', focusedElement)
    },
    setRelationship(context, relationship) {
      context.commit('setRelationship', relationship)
    },
    setSelectedComponentId(context, selection) {
      context.commit('setSelectedComponentId', selection)
    },
    toggleComponents(context, value) {
      context.commit('toggleComponents', value)
    },
    toggleSelection: (context, value) => context.commit('toggleSelection', value),
    unsetNewDiagramRelationship: (context) => {
      context.commit('unsetNewDiagramRelationship')
    },
    updateNewDiagramRelationship: (context, value) => {
      context.commit('updateNewDiagramRelationship', value)
    }
  }
}

export default ui
