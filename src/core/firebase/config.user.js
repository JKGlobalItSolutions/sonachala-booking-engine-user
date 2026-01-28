import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const userFirebaseConfig = {
  apiKey: import.meta.env.VITE_USER_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_USER_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_USER_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_USER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_USER_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_USER_FIREBASE_APP_ID,
};

// Initialize user Firebase app separately
const userApp = initializeApp(userFirebaseConfig, "user-app");
export const auth = getAuth(userApp); // This is userAuth
export const db = getFirestore(userApp); // This is userDB
export const storage = getStorage(userApp); // This is userStorage
