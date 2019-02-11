const ui = {
  state: {
    editingComponent: null,
    focusedElement: null,
    selecting: false,
    showComponents: false,
    textSelectionStart: null,
    textSelectionEnd: null
  },
  getters: {
    editingComponent(state) {
      return state.editingComponent
    },
    focusedElement: (state) => state.focusedElement,
    selecting(state) {
      return state.selecting
    },
    selection(state) {
      if (typeof state.textSelectionStart === 'number'
        && typeof state.textSelectionEnd === 'number') {
        return {
          start: state.textSelectionStart,
          end: state.textSelectionEnd
        }
      }
      return null
    },
    showComponents(state) {
      return state.showComponents
    }
  },
  mutations: {
    editComponent(state, component) {
      state.editingComponent = component
    },
    setFocus(state, elementId) {
      state.focussedElement = elementId
    },
    setSelection(state, {start, end}) {
      state.textSelectionStart = start
      state.textSelectionEnd = end
    },
    toggleComponents(state) {
      state.showComponents = !state.showComponents
    },
    toggleSelection(state, value) {
      state.selecting = typeof value === 'undefined' ? !state.selecting : value
    },
    unsetSelection(state) {
      state.textSelectionStart = null
      state.textSelectionEnd = null
    }
  }
}

export default ui
