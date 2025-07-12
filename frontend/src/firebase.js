// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfat9BP3qQt2cxi2HCa7EkD6uCzmhR8Lc",
  authDomain: "decentralized-healthcare-5187b.firebaseapp.com",
  projectId: "decentralized-healthcare-5187b",
  storageBucket: "decentralized-healthcare-5187b.appspot.com",  // fixed here
  messagingSenderId: "395711343122",
  appId: "1:395711343122:web:1bc813749f17dee01ec6cb",
  measurementId: "G-2BYWTBXYVM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
