const ui = {
  state: {
    showComponents: false
  },
  getters: {
    showComponents(state) {
      return state.showComponents
    }
  },
  mutations: {
    toggleComponents(state) {
      state.showComponents = ! state.showComponents
    }
  }
}

export default ui
