const ui = {
  state: {
    showComponents: false,
    textSelection: null
  },
  getters: {
    selection(state) {
      return state.textSelection
    },
    showComponents(state) {
      return state.showComponents
    }
  },
  mutations: {
    setSelection(state, selection) {
      console.log(selection)
      state.textSelection = selection
    },
    toggleComponents(state) {
      state.showComponents = ! state.showComponents
    }
  }
}

export default ui
