// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ0dqL_8uEn5Ps3wePJ631gfcMAZpm2X0",
  authDomain: "pasion-choppers.firebaseapp.com",
  projectId: "pasion-choppers",
  storageBucket: "pasion-choppers.appspot.com",
  messagingSenderId: "211864137160",
  appId: "1:211864137160:web:26b1670889d7c145b7a4fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//export const storage = getStorage(app);
