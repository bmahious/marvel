
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'


const config = {
    apiKey: "AIzaSyAYzNhl47lejF_Sh-LwPVrDhoZQBLE1edQ",
    authDomain: "marvel-quiz-76ed8.firebaseapp.com",
    projectId: "marvel-quiz-76ed8",
    storageBucket: "marvel-quiz-76ed8.appspot.com",
    messagingSenderId: "701615688434",
    appId: "1:701615688434:web:3c9fc08c32dc8512739e6b"
  };

  const auth = getAuth(app)

  // Inscription

//   signUpUser = () => this.auth.createUserWithEmailAndPassword()
export const app = initializeApp(config)