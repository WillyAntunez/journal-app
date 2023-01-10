// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLg-P_Z4UY-3wYTI5zb-3y9ZmxuihHKXI",
  authDomain: "react-cursos-8c801.firebaseapp.com",
  projectId: "react-cursos-8c801",
  storageBucket: "react-cursos-8c801.appspot.com",
  messagingSenderId: "580532874579",
  appId: "1:580532874579:web:517f800fc19dc253d6c5a6"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore( FirebaseApp );