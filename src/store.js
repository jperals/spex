import frames from '@/store/frames'
import projects from '@/store/projects'
import stories from '@/store/stories'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    frames,
    projects,
    stories
  }
})
