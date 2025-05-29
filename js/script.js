// Elements for mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Toggle mobile menu on click
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Loader fadeout after full page load
window.addEventListener("load", function () {
  const loader = document.getElementById("loader-wrapper");
  if (loader) {
    loader.style.transition = "opacity 2s ease";
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 2000);
  }
});

// Form submission loader logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms['submit-to-google-sheet'];
  const loader = document.getElementById("loader-wrapper");

  if (form && loader) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      // Show loader immediately on submit
      loader.style.display = "flex";
      loader.style.opacity = "1";
      loader.style.transition = "opacity 0.3s ease";

      // Send form data to Google Apps Script
      fetch('https://script.google.com/macros/s/AKfycbzr9W-_LsRh4uJbBv7BcKxdbe4W1mLbFhepfLkBEck5nVGwS8qudpMw2u1qnrR4H4Bg/exec', {
        method: 'POST',
        body: new FormData(form)
      })
      .then(response => {
        // ✅ Success Toast
        Toastify({
          text: "✅ Thank you! Your message has been sent.",
          duration: 4000,
          gravity: "top",
          position: "right",
          backgroundColor: "#28a745",
          stopOnFocus: true,
        }).showToast();

        form.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);

        // ❌ Error Toast
        Toastify({
          text: "❌ Sorry, something went wrong.",
          duration: 4000,
          gravity: "top",
          position: "right",
          backgroundColor: "#dc3545",
          stopOnFocus: true,
        }).showToast();
      })
      .finally(() => {
        // Hide loader after fetch completes
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      });
    });
  }
});
