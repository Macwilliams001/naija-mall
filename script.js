import { db, storage, saveBusiness } from './firebase.js';
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const form = document.getElementById('businessForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.innerText = "Uploading...";
  submitBtn.disabled = true;

  try {
    // 1. Get form data
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('businessImage').files[0];

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    // 2. Upload image to Firebase Storage
    const imageRef = ref(storage, `business_images/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);
    
    console.log("Image uploaded:", imageUrl);

    // 3. Save business data + image URL to Firestore
    const businessData = {
      name,
      category,
      address,
      phone,
      description,
      imageUrl // <-- This is the important part
    };

    await saveBusiness(businessData);

    alert("Business submitted successfully! 🔥");
    form.reset();

  } catch (error) {
    console.error("Error:", error);
    alert("Error submitting business: " + error.message);
  } finally {
    submitBtn.innerText = "SUBMIT BUSINESS";
    submitBtn.disabled = false;
  }
});
