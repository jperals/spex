import components from '@/store/components'
import frames from '@/store/frames'
import projects from '@/store/projects'
import stories from '@/store/stories'
import ui from '@/store/ui'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    components,
    frames,
    projects,
    stories,
    ui
  }
})
