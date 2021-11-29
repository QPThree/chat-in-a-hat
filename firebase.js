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
  apiKey: "AIzaSyD6m8xOo0vP3wTTKDtQmco-aFkJpSw7kWo",
  authDomain: "chat-in-a-hat-83436.firebaseapp.com",
  projectId: "chat-in-a-hat-83436",
  storageBucket: "chat-in-a-hat-83436.appspot.com",
  messagingSenderId: "157078248483",
  appId: "1:157078248483:web:2acb87a6d950f873566596"
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
