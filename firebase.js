// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOPwRv0HbK7uJSrBxVl2v0Om1LRZFp1f4",
  authDomain: "chat-in-a-hat-93c17.firebaseapp.com",
  projectId: "chat-in-a-hat-93c17",
  storageBucket: "chat-in-a-hat-93c17.appspot.com",
  messagingSenderId: "873053449560",
  appId: "1:873053449560:web:8eb110aab2cf28dfb1492d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = {
  app,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};
