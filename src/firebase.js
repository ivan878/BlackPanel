// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore, collection } from 'firebase/firestore';

import  { getStorage } from 'firebase/storage';
require('firebase/auth');


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app =  firebase.initializeApp ( {
  apiKey: "AIzaSyCGGwamytVI8A9maiMt8CYWFGLRXg6jRC8",
  authDomain: "blackcomics-40533.firebaseapp.com",
  projectId: "blackcomics-40533",
  storageBucket: "blackcomics-40533.appspot.com",
  messagingSenderId: "157123189917",
  appId: "1:157123189917:web:8177b2bc2b42eeb8914874"
});

// Initialize Firebase
export default app;
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const myCollection = collection(db, 'Scan');
// export const  store = app.storage(app);
export const auth = app.auth();

