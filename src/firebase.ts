import { initializeApp } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSENGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyCcVsc09S11LWZ2oS1h2wzXKYA7UrtgTZI",
    authDomain: "the-tren-store.firebaseapp.com",
    projectId: "the-tren-store",
    storageBucket: "the-tren-store.appspot.com",
    messagingSenderId: "76345466962",
    appId: "1:76345466962:web:36343ed3925a2f3f23ff8b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
// Enable local persistence
// setPersistence(auth, browserLocalPersistence)
//   .then(() => {
//     // This will enable persistence
//   })
//   .catch((error) => {
//     console.error("Error enabling persistence:", error);
//   });
export { app, auth, storage, db };
