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
    title: 'Home Lighting',
    description: 'When I come home, I want my home to welcome me with a warm atmosphere.'
  })
])

const story = store.getters.storyById('0')

store.commit('addFrame', {
  story
  ,
  frame: new Frame({
    story,
    title: 'Coming home'
  })
  }
)

store.commit('addFrame', {
  story,
  frame: new Frame({
    story,
    title: 'Lights on'
  })
  }
)