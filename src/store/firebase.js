const firebase = require("firebase/app");
// Required for side-effects
require('firebase/auth')
require("firebase/firestore");
require('firebase/storage')

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  // authDomain: '### FIREBASE AUTH DOMAIN ###',
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET
});

const db = firebase.firestore();
const storage = firebase.storage()
const storageRef = storage.ref()

export {
  db,
  firebase,
  storageRef
}
