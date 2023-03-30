import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
signOut } from "firebase/auth";
import { addDoc, collection, getFirestore, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAryUeSGefFoHrOA0j7PBzroCm1BpLfqTk",
  authDomain: "solutionchallenge23-3597e.firebaseapp.com",
  projectId: "solutionchallenge23-3597e",
  storageBucket: "solutionchallenge23-3597e.appspot.com",
  messagingSenderId: "1083442959990",
  appId: "1:1083442959990:web:901c30687c81572c7b3157",
  measurementId: "G-P185KXTDN4",
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

// Initializing Firebase Authentication
const auth = getAuth(app);

// Initializing Cloud Firestore 
const db = getFirestore(app);

// Initializing Cloud Storage in Firebase 
const storage = getStorage(app);

export {
  db,
  app,
  auth,
  addDoc,
  getDocs,
  signOut,
  storage,
  collection,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};