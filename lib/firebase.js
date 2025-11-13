// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5YjKkyzuV3N-xb6Fl3Uvqot6yFfK8-fU",
  authDomain: "email-submitting-app.firebaseapp.com",
  projectId: "email-submitting-app",
  storageBucket: "email-submitting-app.firebasestorage.app",
  messagingSenderId: "213382782363",
  appId: "1:213382782363:web:721d4ed5a0eb42dcbcd53e"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
