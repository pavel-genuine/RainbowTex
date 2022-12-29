// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgoWaYNQ1x6AG3ZMEjm6QCdB4l_z6qwzQ",
  authDomain: "gorental-6e17b.firebaseapp.com",
  projectId: "gorental-6e17b",
  storageBucket: "gorental-6e17b.appspot.com",
  messagingSenderId: "440315835970",
  appId: "1:440315835970:web:45b38d98beebc0f076dfdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;