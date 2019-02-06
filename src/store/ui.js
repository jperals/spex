const ui = {
  state: {
    showComponents: false,
    textSelectionStart: null,
    textSelectionEnd: null
  },
  getters: {
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
