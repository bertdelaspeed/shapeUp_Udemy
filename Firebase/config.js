import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlg7X-tioAsRI5Tab-BE8xNciAISfWKJk",
  authDomain: "shapeup-udemy.firebaseapp.com",
  projectId: "shapeup-udemy",
  storageBucket: "shapeup-udemy.appspot.com",
  messagingSenderId: "509181174873",
  appId: "1:509181174873:web:c296468056519f65093d48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// useless comment
