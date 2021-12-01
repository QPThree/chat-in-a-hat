// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  orderBy,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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
let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore();

module.exports = {
  app,
  auth: getAuth(),
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  collection,
  addDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  getDoc,
  setDoc,
};
