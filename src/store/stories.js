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
        description: 'When I come home, I want my home to welcome me with a warm atmosphere.'
      }
    ]
  },
  getters: {
    framesFromStory: (state, getters) => (story) => {
      try {
        return getters.frames.filter(item => item.storyId === story.id)
      } catch(e) {
        console.warn(e)
        return []
      }
    },
    stories: state => state.stories,
    storyById: (state, getters) => id => getters.stories.find(story => story.id === Number(id))
  },
  mutations: {
    addNewStory(state, project) {
      state.projects.push(new Story(project))
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
