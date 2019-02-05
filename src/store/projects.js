class Project {
  constructor() {
    this.id = projects.state.projects.length.toString()
  }
}

const projects = {
  state: {
    projects: [
      {
        id: 0
      }
    ]
  },
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
    updateProjects(state, projects) {
      state.projects = projects
    }
  },
  actions: {

  },
  getters: {
    projects: (state) => {
      return state.projects
    }
  }
}

export default projects
