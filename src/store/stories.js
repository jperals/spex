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
      try {
        return story.frames.map(frameId => getters.frameById(frameId))
      } catch(e) {
        console.warn(e)
        return []
      }
    },
    stories: state => state.stories,
    storyById: (state, getters) => id => getters.stories.find(story => story.id === id)
  },
  mutations: {
    addFrame(state, { story, frame }) {
      story.frames.push(frame.id)
    },
    addStory(state, story) {
      state.stories.push(story)
    },
    addNewStory(state, project) {
      state.stories.push(new Story(project))
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
  }
}

export default stories
