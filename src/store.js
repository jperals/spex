import components from '@/store/components'
import diagrams from '@/store/diagrams'
import frames from '@/store/frames'
import projects from '@/store/projects'
import stories from '@/store/stories'
import ui from '@/store/ui'
import user from '@/store/user'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    components,
    diagrams,
    frames,
    projects,
    stories,
    ui,
    user
  },
  getters: {
    // Returns which frames link to what components
    // in the form of an object containing string:set pairs, like
    // {
    //   componentId1: Set { frameId1, frameId2, frameId3 }
    // }
    frameToComponentLinks: (state, getters) => story => {
      const links = {}
      const parser = new DOMParser()
      for (const frame of getters.framesFromStory(story)) {
        const element = parser.parseFromString(frame.description, 'text/html')
        const frameLinks = element.querySelectorAll('.smart-link')
        for (const link of frameLinks) {
          const id = link.getAttribute('link-id')
          if (typeof id === 'string') {
            if (typeof links[id] === 'undefined') {
              links[id] = new Set()
            }
            links[id].add(frame)
          }
        }
      }
      return links
    },
    framesThatLinkToComponent: (state, getters) => component => {
      const story = getters.storyById(component.storyId)
      const frameToComponentLinks = getters.frameToComponentLinks(story)
      const set = frameToComponentLinks[component.id]
      if (set) {
        return Array.from(frameToComponentLinks[component.id])
      }
      return []
    }
  }
})

export default store
