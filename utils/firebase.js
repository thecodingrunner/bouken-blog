// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "bouken-blog.firebaseapp.com",
  projectId: "bouken-blog",
  storageBucket: "bouken-blog.appspot.com",
  messagingSenderId: "846509933706",
  appId: "1:846509933706:web:b55e9d27bcca24b5235973"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);