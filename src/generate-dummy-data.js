import store from '@/store.js'
import {Story} from '@/store/stories.js'

store.commit('updateProjects', [
  {
    id: '0'
  }
])

store.commit('updateStories', [
  new Story({
    id: '0',
    projectId: '0',
    title: 'Assembly Line',
    description: 'Technicians can assemble units, and use industrial machinery, assisted by Augmented Reality',
    frames: [
      'cIylZ9eWVYDvSo8AIZna',
      'riMCVi49OUwrejv06AcU'
    ]
  })
])
