import {firebase} from '@/store/firebase'
import dummyData from "@/generate-dummy-data";

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

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
      state.signedIn = false
    }
  },
  actions: {
    signIn(context, credentials) {
      return signIn(credentials)
        .then(() => {
          context.commit('signIn', firebase.auth().currentUser)
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

function signIn(credentials) {
  if (credentials && credentials.email && credentials.password) {
    return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
  } else {
    // Assume the user is already logged in
    return new Promise(resolve => resolve())
  }
}

export default user
