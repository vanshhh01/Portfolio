// Contact/Hire Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create popup container
  const popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay';
  document.body.appendChild(popupOverlay);

  // Popup template
  const popupHTML = `
    <div class="popup-content">
      <h3>Contact Me</h3>
      <p class="popup-email">vanshchauhan0478@gmail.com</p>
      <div class="popup-buttons">
        <button class="popup-copy">Copy Email</button>
        <button class="popup-close">Close</button>
      </div>
    </div>
  `;

  // Attach to both contact and hire me buttons
  document.querySelectorAll('.contact-btn, .profile button').forEach(btn => {
    btn.addEventListener('click', () => {
      popupOverlay.innerHTML = popupHTML;
      popupOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close popup
  popupOverlay.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup-close') || e.target === this) {
      popupOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Copy email
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup-copy')) {
      navigator.clipboard.writeText('vanshchauhan0478@gmail.com')
        .then(() => {
          e.target.textContent = 'Copied!';
          setTimeout(() => e.target.textContent = 'Copy Email', 2000);
        });
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      popupOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});
