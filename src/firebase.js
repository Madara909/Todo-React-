// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfhOv7Y3v7l5ru0x_XF7jGbyukCPClMqc",
  authDomain: "todo-30cbb.firebaseapp.com",
  projectId: "todo-30cbb",
  storageBucket: "todo-30cbb.appspot.com",
  messagingSenderId: "22953083349",
  appId: "1:22953083349:web:2c65891167c362141c3d5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);