import Frame from '@/store/Frame'
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
    description: 'Technicians can assemble units, and use industrial machinery, assisted by Augmented Reality'
  })
])

const story = store.getters.storyById('0')

store.commit('addFrame', {
  story
  ,
  frame: new Frame({
    story,
    title: 'Arrive at Machine',
    description: 'A factory technician arrrives at the MOTO MH-6, puts on AR glasses and choses ‘Begin’ from the controls he sees in AR.'
  })
  }
)

store.commit('addFrame', {
  story,
  frame: new Frame({
    story,
    title: 'Collect Components',
    description: 'He sees a list of the components he has to collect. The glasses show him which shelves to find the components in.'
  })
  }
)