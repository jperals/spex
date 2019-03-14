class Project {
  constructor() {
    this.id = projects.state.projects.length.toString()
  }
}

function initialState() {
  return {
    projects: [
      {
        id: 0
      }
    ]
  }
}

const projects = {
  state: initialState(),
  mutations: {
    addNewProject(state) {
      state.projects.push(new Project())
    },
    removeProject(state, project) {
      const index = state.projects.findIndex(item => item.id === project.id)
      if (index === -1) {
        console.warn('Project with id', project.id, 'not found.')
        return
      }
      state.projects.splice(index)
    },
    reset(state) {
      Object.assign(state, initialState())
    },
    updateProjects(state, projects) {
      state.projects = projects
    }
  },
  actions: {
    reset(context) {
      return context.commit('reset')
    }
  },
  getters: {
    projects: (state) => {
      return state.projects
    }
  }
}

export default projects
