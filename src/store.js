import components from '@/store/components'
import db from './store/firebase'
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

db.collection('components').get()
  .then(documents => {
    documents.forEach(document => {
      const component = document.data()
      store.dispatch('saveComponent', component)
    })
  })

export default store
