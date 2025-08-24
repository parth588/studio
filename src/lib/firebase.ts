import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaJxnKWkXUPlzc0w6aUuAxT72RBPs5gcw",
  authDomain: "big4india-75b92.firebaseapp.com",
  projectId: "big4india-75b92",
  storageBucket: "big4india-75b92.appspot.com",
  messagingSenderId: "635435989681",
  appId: "1:635435989681:web:8321bbfae15b6084d18090",
  measurementId: "G-2VB1BRVLKP"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
