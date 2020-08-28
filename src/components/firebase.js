//import firebase from "firebase"
import firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"

var firebaseConfig = {
  apiKey: process.env.gatsby_apiKey,
  authDomain: process.env.gatsby_authDomain,
  databaseURL: process.env.gatsby_databaseURL,
  projectId: process.env.gatsby_projectId,
  storageBucket: process.env.gatsby_storageBucket,
  messagingSenderId: process.env.gatsby_messagingSenderId,
  appId: process.env.gatsby_appId,
  measurementId: process.env.gatsby_measurementId
}

const isWindow = typeof window !== "undefined" && window

if (isWindow) {
  console.log(firebaseConfig)
  firebase.initializeApp(firebaseConfig)
}

export default firebase
