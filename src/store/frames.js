import Frame from "./Frame";

const frames = {
  state: {
    frames: []
  },
  getters: {
    frameById: state => id => state.frames.find(frame => frame.id === id),
    frames: state => state.frames,
    framesFromSameStory: state => ourFrame => state.frames.filter(anotherFrame => anotherFrame.storyId === ourFrame.storyId)
  },
  mutations: {
    addFrame(state, {frame}) {
      state.frames.push(frame)
    },
    removeFrame(state, frame) {
      const index = state.frames.findIndex(item => item.id);
      if (index === -1) {
        console.warn("Frame with id", frame.id, "not found.");
        return;
      }
      state.frames.splice(index);
    },
    updateFrames(state, frames) {
      state.frames = frames;
    }
  },
  actions: {
    addNewFrame(context, story) {
      const frame = new Frame({story})
      context.commit('addFrame', {story, frame})
    }
  }
};

export default frames;
