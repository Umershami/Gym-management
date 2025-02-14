// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhxT9vsIKJJuCp8bbRMTN44yt8O3iA_eE",
  authDomain: "gymms-41376.firebaseapp.com",
  projectId: "gymms-41376",
  storageBucket: "gymms-41376.firebasestorage.app",
  messagingSenderId: "781761385619",
  appId: "1:781761385619:web:9d9476ac3fcb0d46d96966",
  measurementId: "G-BJ9DPKHTDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Firestore and Authentication
const db = getFirestore(app);  // Firestore
const auth = getAuth(app);     // Authentication

export { db, auth };
