import Frame from "./Frame";
import {db, storageRef} from '@/store/firebase'

const collection = db.collection('frames')

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
    addImageToFrame(state, {frame, imageFile}) {
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
    setFrameImageUrl(state, {frame, imageUrl}) {
      frame.imageUrl = imageUrl
    },
    updateFrames(state, frames) {
      state.frames = frames;
    }
  },
  actions: {
    addNewFrame(context, story) {
      const frame = new Frame({story})
      context.commit('addFrameToStory', {story, frame})
    },
    addImageToFrame(context, {frame, imageFile}) {
      const imageRef = storageRef.child(`frame-images/${frame.id}`)
      return imageRef.put(imageFile)
        .catch(e => console.error(e))
        .then(() => imageRef.getDownloadURL())
        .then(imageUrl => {
          context.commit('setFrameImageUrl', {frame, imageUrl})
          return imageUrl
        })
    },
    loadFrames(context) {
      return collection.get()
        .catch(console.error)
        .then(documents => {
          const frames = []
          documents.forEach(document => {
            const frame = document.data()
            frame.id = document.id
            frames.push(frame)
          })
          context.commit('updateFrames', frames)
          for (const frame of frames) {
            const story = context.getters.storyById(frame.storyId)
            context.commit('addFrameToStory', {story, frame})
          }
        })
    }
  }
};

export default frames;
