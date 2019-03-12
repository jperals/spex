import store from '@/store.js'

store.commit('updateProjects', [
  {
    id: '0'
  }
])

store.commit('addDiagramRelationship', {
  id: '0',
  from: 'F4lSsfNGpLZlgOnZJcor',
  to: 'g4LLTzHTrP85FtTLADNN',
})

store.commit('updateDiagramComponentPosition', {
  component: {
    id: 'F4lSsfNGpLZlgOnZJcor'
  },
  newPosition: {
    x: 20,
    y: 50
  }
})
