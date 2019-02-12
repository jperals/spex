import components from '@/store/components'
import frames from '@/store/frames'
import projects from '@/store/projects'
import semantics from '@/store/semantics'
import stories from '@/store/stories'
import ui from '@/store/ui'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    components,
    frames,
    projects,
    semantics,
    stories,
    ui
  }
})

export default store
