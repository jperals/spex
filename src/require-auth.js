// Based on this approach
// https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router
import dummyData from '@/generate-dummy-data'
import {firebase} from '@/store/firebase'
import store from '@/store'
import router from "./router";

let nextUrl = null

export default function requireAuth(router) {
  store.watch(() => store.getters.signedIn, signedIn => {
    if (signedIn && nextUrl) {
      router.push(nextUrl)
      nextUrl = null
    }
  })
  router.beforeEach(beforeNext)
}

// Load data when logged in,
// and flush it when logged out.
firebase.auth().onAuthStateChanged(function (user) {
  console.log('auth', user)
  if (user) {
    // User is signed in.
    store.dispatch('signIn')
    loadContent(store)
  } else {
    // No user is signed in.
    // Flush the data and send the user to the login page.
    store.dispatch('signOut')
      .then(() => store.dispatch('reset'))
      .then(() => router.push('/login'))
  }
});

function loadContent(context) {
  context.dispatch('loadContent')
    .then(() => {
      dummyData(context)
    })
}

function beforeNext(to, from, next) {
  const pathRequiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const signedIn = store.getters.signedIn
  const waiting = typeof store.getters.signedIn === 'undefined'
  if (pathRequiresAuth) {
    if (waiting) {
      nextUrl = to.fullPath
    } else {
      if (signedIn) {
        next()
        nextUrl = null
      } else {
        next({
          path: '/login',
          params: {nextUrl: to.fullPath}
        })
        nextUrl = null
      }
    }
  } else {
    next()
  }
}
