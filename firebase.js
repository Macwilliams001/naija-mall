// 1. Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// 2. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "PASTE YOUR API KEY HERE",
  authDomain: "naija-mall.firebaseapp.com",
  projectId: "naija-mall",
  storageBucket: "naija-mall.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // <-- ADD THIS LINE FOR IMAGES

// 4. Function to save business
export async function saveBusiness(businessData) {
  try {
    const docRef = await addDoc(collection(db, "businesses"), {
      ...businessData,
      createdAt: serverTimestamp()
    });
    console.log("Business saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}
