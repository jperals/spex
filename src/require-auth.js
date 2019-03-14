// Based on this approach
// https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router
import dummyData from '@/generate-dummy-data'
import {firebase} from '@/store/firebase'
import store from '@/store'
import router from "./router";

export default function requireAuth(router) {
  router.beforeEach((to,from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.signedIn) {
        next()
      }
      else {
        next({
          path: '/login',
          params: {nextUrl: to.fullPath}
        })
      }
    } else {
      next()
    }
  })
}

// Load data when logged in,
// and flush it when logged out.
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    store.dispatch('signIn')
    loadContent(store)
  } else {
    // No user is signed in.
    // Flush the data and send the user to the login page.
    store.dispatch('reset')
      .then(() => router.push('/login'))
  }
});

function loadContent(context) {
  return Promise.all([
    context.dispatch('loadComponents'),
    context.dispatch('loadDiagrams'),
    context.dispatch('loadFrames'),
    context.dispatch('loadStories')
  ])
    .then(() => {
      dummyData(context)
    })
}
