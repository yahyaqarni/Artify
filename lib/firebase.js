// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGU_EKvgO-GqyFKg6BTdJP0178QqDui68",
  authDomain: "artify-mad.firebaseapp.com",
  projectId: "artify-mad",
  storageBucket: "artify-mad.appspot.com",
  messagingSenderId: "1094051219119",
  appId: "1:1094051219119:web:b34399cda87451f410765a",
  measurementId: "G-G17HHTNT38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app, 'https://artify-mad-default-rtdb.asia-southeast1.firebasedatabase.app');

export { storage, db };