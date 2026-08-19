//  firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 1. PASTE YOUR CONFIG HERE - RIGHT HERE 👇
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "naija-mall.firebaseapp.com",
  projectId: "naija-mall",
  storageBucket: "naija-mall.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
// ☝️ DELETE the lines above and paste your whole config here

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 3. Function to save business
export async function saveBusiness(businessData) {
  try {
    const docRef = await addDoc(collection(db, "businesses"), {
      ...businessData,
      createdAt: serverTimestamp()
    });
    console.log("Business saved with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}
