import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj-OqEW1vsz1kLdwJZGJhxgzlGYrklEZc",
  authDomain: "discode-clone-bc7f4.firebaseapp.com",
  projectId: "discode-clone-bc7f4",
  storageBucket: "discode-clone-bc7f4.firebasestorage.app",
  messagingSenderId: "936043859789",
  appId: "1:936043859789:web:c6cbe937397ab02f357104",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
