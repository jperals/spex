const frames = {
  state: {
    frames: [
      {
        title: 'Coming home',
        story: 0
      },
      {
        title: 'Lights on',
        story: 0
      }
    ]
  },
  getters: {
    frames: state => state.frames
  },
  mutations: {
    removeFrame(state, frame) {
      const index = state.frames.findIndex(item => item.id)
      if(index === -1) {
        console.warn('Frame with id', frame.id, 'not found.')
        return
      }
      state.frames.splice(index)
    },
    updateFrames(state, frames) {
      state.frames = frames
    }
  }
}

export default frames;
