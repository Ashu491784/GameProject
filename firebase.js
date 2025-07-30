import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKNnuaC6wAPMg-oUrLCGUcTanwwayuLmw",
  authDomain: "finalprojectgame-23eb9.firebaseapp.com",
  databaseURL: "https://finalprojectgame-23eb9-default-rtdb.firebaseio.com",
  projectId: "finalprojectgame-23eb9",
  storageBucket: "finalprojectgame-23eb9.firebasestorage.app",
  messagingSenderId: "400520720585",
  appId: "1:400520720585:web:563646cb5ff96a225e9d18",
  measurementId: "G-QHPWTJ4J0X"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);


export { ref, push, onValue, remove, set };
