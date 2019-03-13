import {firebase} from '@/store/firebase'
import dummyData from "@/generate-dummy-data";

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

console.log(firebase.auth().currentUser)

const user = {
  state: {
    user: null,
    signedIn: false
  },
  getters: {
    signedIn: state => state.signedIn
  },
  mutations: {
    signIn(state, user) {
      state.signedIn = true
      state.user = user
    },
    signOut(state) {
      state.signedIn= false
    }
  },
  actions: {
    signIn(context, {email, password}) {
      return firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          context.commit('signIn', firebase.auth().currentUser)
          return Promise.all([
            context.dispatch('loadComponents'),
            context.dispatch('loadDiagrams'),
            context.dispatch('loadFrames'),
            context.dispatch('loadStories')
          ])
        })
        .then(() => {
          dummyData(context)
        })
        .catch(error => {
          console.error(error.message)
        })
    },
    signOut(context) {
      return firebase.auth()
        .signOut()
        .then(() => {
          context.commit('signOut')
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  }
}

export default user
