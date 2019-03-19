import store from '@/store.js'

export default function init() {
  store.commit('updateProjects', [
    {
      id: '0'
    }
  ])

}