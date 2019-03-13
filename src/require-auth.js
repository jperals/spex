// Based on this approach
// https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router
import store from '@/store'

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
