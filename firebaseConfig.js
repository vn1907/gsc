import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAryUeSGefFoHrOA0j7PBzroCm1BpLfqTk",
  authDomain: "solutionchallenge23-3597e.firebaseapp.com",
  projectId: "solutionchallenge23-3597e",
  storageBucket: "solutionchallenge23-3597e.appspot.com",
  messagingSenderId: "1083442959990",
  appId: "1:1083442959990:web:901c30687c81572c7b3157",
  measurementId: "G-P185KXTDN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
  db,
  app,
  auth,
  addDoc,
  collection,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
};