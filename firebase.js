import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove , set} from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDigDKW0-ytSwcxrLtNOiEYGd6huhewrCI",
  authDomain: "gamedevelop-bca21.firebaseapp.com",
  databaseURL: "https://gamedevelop-bca21-default-rtdb.firebaseio.com",
  projectId: "gamedevelop-bca21",
  storageBucket: "gamedevelop-bca21.firebasestorage.app",
  messagingSenderId: "594430618290",
  appId: "1:594430618290:web:14a67a719a27b4c301b7ab",
  measurementId: "G-W3DSVTYNJD"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app)


export { ref, push, onValue, remove, set}