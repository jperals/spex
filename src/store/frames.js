import Frame from "./Frame";
import {storageRef} from '@/store/firebase'

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
    addImage(state, {frame, imageFile}) {
      frame.addImage(imageFile)
    },
    forceFrameUpdate(state, frame) {
      const index = state.frames.indexOf(frame)
      if (index === -1) {
        console.warn('Frame not found:', frame)
        return
      }
      state.frames[index] = Object.assign({}, frame)
    },
    removeFrame(state, frame) {
      const index = state.frames.findIndex(item => item.id);
      if (index === -1) {
        console.warn("Frame with id", frame.id, "not found.");
        return;
      }
      state.frames.splice(index);
    },
    setImageUrl(state, {frame, imageUrl}) {
      frame.imageUrl = imageUrl
    },
    updateFrames(state, frames) {
      state.frames = frames;
    }
  },
  actions: {
    addNewFrame(context, story) {
      const frame = new Frame({story})
      context.commit('addFrame', {story, frame})
    },
    addImage(context, {frame, imageFile}) {
      context.commit('addImage', {frame, imageFile})
      const imageRef = storageRef.child(`frame-images/${frame.id}`)
      return imageRef.put(imageFile)
        .catch(e => console.error(e))
        .then(() => imageRef.getDownloadURL())
        .then(imageUrl => {
          context.commit('setImageUrl', {frame, imageUrl})
          return imageUrl
        })
    }
  }
};

export default frames;
