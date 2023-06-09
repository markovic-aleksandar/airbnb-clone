import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "airbnb-app-clone-aad3f.firebaseapp.com",
  projectId: "airbnb-app-clone-aad3f",
  storageBucket: "airbnb-app-clone-aad3f.appspot.com",
  messagingSenderId: "948829478550",
  appId: "1:948829478550:web:092d039f79ce3d6da2acb7"
};

// init firebase config
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);