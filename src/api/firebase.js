// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdTUNfB8FbU42EWK9PqFxtVzxj_xm5g_E",
  authDomain: "morent-car.firebaseapp.com",
  projectId: "morent-car",
  storageBucket: "morent-car.firebasestorage.app",
  messagingSenderId: "108157200492",
  appId: "1:108157200492:web:3028ad94f94717e9b35049",
  measurementId: "G-8P4G7Q358Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)