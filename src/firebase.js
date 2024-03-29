// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2SytBWVLVTG5ro5tJ-HnCCNFJmEL-1o0",
  authDomain: "podcast-1-551f9.firebaseapp.com",
  projectId: "podcast-1-551f9",
  storageBucket: "podcast-1-551f9.appspot.com",
  messagingSenderId: "956134978000",
  appId: "1:956134978000:web:2d0a7c89e20075487289d5",
  measurementId: "G-SEFFQPXQ2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };