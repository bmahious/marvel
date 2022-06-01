
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
import {doc, getFirestore} from 'firebase/firestore'


const config = {
    apiKey: "AIzaSyAYzNhl47lejF_Sh-LwPVrDhoZQBLE1edQ",
    authDomain: "marvel-quiz-76ed8.firebaseapp.com",
    projectId: "marvel-quiz-76ed8",
    storageBucket: "marvel-quiz-76ed8.appspot.com",
    messagingSenderId: "701615688434",
    appId: "1:701615688434:web:3c9fc08c32dc8512739e6b"
  };

const app = initializeApp(config)
export const db = getFirestore()
export const auth = getAuth(app)
export const user = uid => doc(db, `users/${uid}`)







// class Firebase {
//     constructor() {
//         app.inializeApp(config)
//         this.auth = app.auth()
//     }
//     signupUser = (email, password) =>
//     this.auth.createUserWithEmailAndPassword(email, password)

//     loginUser = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password)

//     signoutUser = () => this.auth.signOut()
// }
// user = (uid) => this.db.doc(`users/${uid}`)