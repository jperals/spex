const ui = {
  state: {
    editingComponent: null,
    showComponents: false,
    textSelectionStart: null,
    textSelectionEnd: null
  },
  getters: {
    editingComponent(state) {
      return state.editingComponent
    },
    selection(state) {
      return {
        start: state.textSelectionStart,
        end: state.textSelectionEnd
      }
    },
    showComponents(state) {
      return state.showComponents
    }
  },
  mutations: {
    editComponent(state, component) {
      state.editingComponent = component
    },
    setSelection(state, {start, end}) {
      state.textSelectionStart = start
      state.textSelectionEnd = end
    },
    toggleComponents(state) {
      state.showComponents = ! state.showComponents
    }
  }
}

export default ui
