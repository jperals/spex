import Vue from 'vue'
import Router from 'vue-router'
import Frame from './views/Frame.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Story from './views/Story.vue'
import System from './views/System.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/story/:storyId',
      name: 'story',
      component: Story,
      // See https://router.vuejs.org/guide/essentials/passing-props.html#boolean-mode
      // > When props is set to true, the route.params will be set as the component props.
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/frame/:frameId',
      name: 'frame',
      component: Frame,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/system/:storyId',
      name: 'system',
      component: System,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
