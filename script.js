// script.js
import { saveBusiness } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('businessForm'); // your form must have this id

  if(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const businessData = {
        name: document.getElementById('businessName').value,
        category: document.getElementById('category').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        description: document.getElementById('description').value,
      };

      const success = await saveBusiness(businessData);

      if(success) {
        alert('Business submitted successfully! 🔥');
        form.reset();
      } else {
        alert('Something went wrong. Please try again.');
      }
    });
  }
});
