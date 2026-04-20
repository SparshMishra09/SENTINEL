import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAAk_se3CWtZ2lSiNOoWNXDZqBOfgRYnIY",
  authDomain: "sentinel-5f9c1.firebaseapp.com",
  projectId: "sentinel-5f9c1",
  storageBucket: "sentinel-5f9c1.firebasestorage.app",
  messagingSenderId: "629107595024",
  appId: "1:629107595024:web:a2e9f36f81a32710c53795",
  measurementId: "G-1WNNJ96CG7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
