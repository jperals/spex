class Frame {
  constructor(story) {
    this.id = frames.state.frames.length
    if(story) {
      this.storyId = story.id
    }
  }
}

const frames = {
  state: {
    frames: []
  },
  getters: {
    frames: state => state.frames
  },
  mutations: {
    addNewFrame(state, story) {
      state.frames.push(new Frame(story))
    },
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
