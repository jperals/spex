const firebase = require("firebase/app");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  databaseURL: 'profi-app-mvp.firebaseio.com',
  // apiKey: '### FIREBASE API KEY ###',
  // authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: 'profi-app-mvp'
});

const db = firebase.firestore();

export default db
