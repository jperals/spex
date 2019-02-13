export class Story {
  constructor(props) {
    this.id = stories.state.stories.length.toString()
    if(props && props.project) {
      this.projectId = props.project.id
    }
    this.frames = []
    Object.assign(this, props)
  }
}

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
    storyFromFrame: (state, getters) => (frame) => getters.stories.find(story => story.id === frame.storyId)
  },
  mutations: {
    addFrameToStory(state, { story, frame }) {
      story.frames.push(frame.id)
    },
    addStory(state, story) {
      state.stories.push(story)
    },
    addNewStory(state, project) {
      state.stories.push(new Story(project))
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
    }
  }
}

export default stories
