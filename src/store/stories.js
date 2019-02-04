import Frame from './Frame'

class Story {
  constructor(project) {
    this.id = stories.state.stories.length
    if(project) {
      this.projectId = project.id
    }
  }
}

const stories = {
  state: {
    stories: [
      {
        id: 0,
        projectId: 0,
        title: 'Home Lighting',
        description: 'When I come home, I want my home to welcome me with a warm atmosphere.',
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
      }
    ]
  },
  getters: {
    framesFromStory: () => (story) => {
      try {
        return story.frames
      } catch(e) {
        console.warn(e)
        return []
      }
    },
    stories: state => state.stories,
    storyById: (state, getters) => id => getters.stories.find(story => story.id === Number(id))
  },
  mutations: {
    addFrame(state, story, frame) {
      story.frames.push(frame)
    },
    addNewFrame(state, story) {
      console.log(story)
      story.frames.push(new Frame(story))
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
