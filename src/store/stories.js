import {db} from '@/store/firebase'

const collection = db.collection('stories')

const stories = {
  state: {
    stories: []
  },
  getters: {
    framesFromStory: (state, getters) => (story) => {
      const frames = []
      if (story.frames instanceof Array) {
        for (const frameId of story.frames) {
          try {
            const frame = getters.frameById(frameId)
            if(typeof frame !== 'undefined') {
              frames.push(frame)
            }
          } catch(e) {
            console.warn(e)
          }
        }
      }
      return frames
    },
    stories: state => state.stories,
    storyById: (state, getters) => id => getters.stories.find(story => story.id === id),
    storyFromFrame: (state, getters) => (frame) => {
      if (typeof frame === 'object') {
        return getters.stories.find(story => story.id === frame.storyId)
      }
    }
  },
  mutations: {
    addFrameToStory(state, { story, frame }) {
      story.frames.push(frame.id)
    },
    addStory(state, story) {
      state.stories.push(story)
    },
    forceStoryUpdate(state, story) {
      state.changeTracker += 1
      const index = state.stories.findIndex(item => item.id === story.id)
      if (index === -1) {
        console.warn('Story with id', story.id, 'not found.')
        return
      }
      state.stories[index] = Object.assign({}, story, {frames: [].concat(story.frames)})
    },
    removeStory(state, story) {
      const index = state.stories.findIndex(item => item.id === story.id)
      if(index === -1) {
        console.warn('Story with id', story.id, 'not found.')
        return
      }
      state.stories.splice(index)
    },
    updateStories(state, stories) {
      state.stories = stories
    }
  },
  actions: {
    addFrameToStory(context, {story, frame}) {
      context.commit('addFrameToStory', {story, frame})
    },
    loadStories(context) {
      return collection.get()
        .then(documents => {
          const stories = []
          documents.forEach(document => {
            const story = Object.assign({id: document.id}, document.data())
            stories.push(story)
          })
          context.commit('updateStories', stories)
        })
        .catch(console.error)
    }
  }
}

export default stories
