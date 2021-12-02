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
  where,
  updateDoc
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
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
  updateDoc,
  where,
  updateProfile,
};
