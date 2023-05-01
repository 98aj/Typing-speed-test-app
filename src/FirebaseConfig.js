import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOWSEAf4nyJKEm2qJhPsHYk1rVZ3RYEHU",
    authDomain: "typing-test-app-7ae5e.firebaseapp.com",
    projectId: "typing-test-app-7ae5e",
    storageBucket: "typing-test-app-7ae5e.appspot.com",
    messagingSenderId: "912587017356",
    appId: "1:912587017356:web:0743d305cb432a29dc3fa9",
    measurementId: "G-2X5NW45FHM"
  };

//Initilize firebase
const firebaseapp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export {auth, db};