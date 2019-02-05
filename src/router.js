import Vue from 'vue'
import Router from 'vue-router'
import Frame from './views/Frame.vue'
import Home from './views/Home.vue'
import Story from './views/Story.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/story/:storyId',
      name: 'story',
      component: Story,
      // See https://router.vuejs.org/guide/essentials/passing-props.html#boolean-mode
      // > When props is set to true, the route.params will be set as the component props.
      props: true
    },
    {
      path: '/frame/:frameId',
      name: 'frame',
      component: Frame,
      props: true
    }
  ]
})
