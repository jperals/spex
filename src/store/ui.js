function initialState() {
  return {
    editingComponent: null,
    error: null,
    focusedElement: null,
    hoveredDiagramItem: null,
    lastAddedRelationship: null,
    newDiagramRelationship: null,
    selecting: false,
    showComponents: false,
    selectedTextComponentId: null
  }
}

const ui = {
  errorTimeout: null,
  state: initialState(),
  getters: {
    editingComponent(state) {
      return state.editingComponent
    },
    error(state) {
      return state.error
    },
    focusedElement: (state) => state.focusedElement,
    hoveredDiagramItem: (state) => state.hoveredDiagramItem,
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
    clearError(state) {
      state.error = null
    },
    openComponent(state, component) {
      state.editingComponent = component
    },
    hoverDiagramItem(state, item) {
      state.hoveredDiagramItem = item
    },
    setFocus(state, elementId) {
      state.focusedElement = elementId
    },
    setError(state, error) {
      state.error = error
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
    hoverDiagramItem(context, item) {
      context.commit('hoverDiagramItem', item)
    },
    openComponent(context, component) {
      context.commit('openComponent', component)
    },
    setError(context, error) {
      if(this.errorTimeout) {
        clearTimeout(this.errorTimeout)
      }
      context.commit('setError', error)
      this.errorTimeout = setTimeout(() => {
        context.commit('clearError')
      }, 1500)
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
