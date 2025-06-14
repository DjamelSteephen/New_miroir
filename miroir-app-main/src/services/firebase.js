// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth }           from "firebase/auth";
import { getFirestore }      from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAldtqN2K-POmBaQiteb69ntW1vJINHjKQ",
  authDomain: "sample-firebase-ai-app-ff8a5.firebaseapp.com",
  projectId: "sample-firebase-ai-app-ff8a5",
  storageBucket: "sample-firebase-ai-app-ff8a5.appspot.com",
  messagingSenderId: "319213580481",
  appId: "1:319213580481:web:2348b10d8dce62a553e440"
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
