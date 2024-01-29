import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuIW-JcW-88xA1ceGXVFPcQre6XkIuPto",
  authDomain: "codeatamrita-faffd.firebaseapp.com",
  projectId: "codeatamrita-faffd",
  storageBucket: "codeatamrita-faffd.appspot.com",
  messagingSenderId: "696489795855",
  appId: "1:696489795855:web:fc419c4724b556da91de7a",
  measurementId: "G-5YW8KY7XW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);