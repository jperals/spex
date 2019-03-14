import {db, storageRef} from '@/store/firebase'

const collection = db.collection('frames')

function initialState() {
  return {
    frames: []
  }
}

const frames = {
  state: initialState(),
  getters: {
    frameById: state => id => state.frames.find(frame => frame.id === id),
    frames: state => state.frames,
    framesFromSameStory: (state, getters) => frame => getters.framesFromStory(getters.storyFromFrame(frame))
  },
  mutations: {
    addFrame(state, frame) {
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
      const index = state.frames.findIndex(item => item.id === frame.id);
      if (index === -1) {
        console.warn("Frame with id", frame.id, "not found.");
        return;
      }
      state.frames.splice(index, 1);
    },
    reset(state) {
      Object.assign(state, initialState())
    },
    setFrameImageUrl(state, {frame, imageUrl}) {
      frame.imageUrl = imageUrl
    },
    updateFrame(state, {frame, newProperties}) {
      Object.assign(frame, newProperties)
    },
    updateFrames(state, frames) {
      state.frames = frames;
    }
  },
  actions: {
    // Adds an empty frame to the frames collection
    // and adds it to the given story too.
    addNewFrameToStory(context, story) {
      const frame = {
        description: '',
        imageUrl: '',
        storyId: story.id,
        title: ''
      }
      return collection.add(frame)
        .then(docRef => {
          context.commit('addFrame', Object.assign(frame, {id: docRef.id}))
          return context.dispatch('addFrameToStory', {story, frame: {id: docRef.id}})
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        })
    },
    addImageToFrame(context, {frame, imageFile}) {
      const imageRef = storageRef.child(`frame-images/${frame.id}`)
      return imageRef.put(imageFile)
        .catch(e => console.error(e))
        .then(() => imageRef.getDownloadURL())
        .then(imageUrl => {
          return context.dispatch('updateFrame', {frame, newProperties: {imageUrl}}).then(() => imageUrl)
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
        })
    },
    removeFrame(context, frame) {
      return collection.doc(frame.id)
        .delete()
        .then(() => {
          context.commit('removeFrame', frame)
        })
        .catch(console.warn)
    },
    reset(context) {
      return context.commit('reset')
    },
    // Update frame properties remotely without waiting for an answer.
    // (Used in text fields where we want immediate reaction)
    sendFrameProperties(context, {frame, props}) {
      return collection.doc(frame.id).set(
        props,
        {
          merge: true
        }
      )
    },
    // Update frame properties remotely before doing so locally.
    updateFrame(context, {frame, newProperties}) {
      return collection.doc(frame.id).set(
        newProperties,
        {
          merge: true
        })
        .then(() => {
          context.commit('updateFrame', {
            frame,
            newProperties
          })
          context.commit('forceFrameUpdate', frame)
        })
    },
  }
};

export default frames;
