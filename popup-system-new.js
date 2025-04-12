// Unified Popup System with requested changes
document.addEventListener('DOMContentLoaded', function() {
  // Create popup container
  const popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay';
  document.body.appendChild(popupOverlay);

  // Email popup template (used for both contact and hire me)
  const emailPopupHTML = `
    <div class="popup-content">
      <h3>Contact Me</h3>
      <p class="popup-email">vanshchauhan0478@gmail.com</p>
      <div class="popup-buttons">
        <button class="popup-copy">Copy Email</button>
        <button class="popup-close">Close</button>
      </div>
    </div>
  `;

  // Banner popup template
  const bannerPopupHTML = `
    <div class="popup-content">
      <img class="popup-banner-img" src="" alt="">
      <div class="popup-buttons">
        <button class="popup-close">Close</button>
      </div>
      <div class="banner-nav">
        <button class="nav-btn prev">❮</button>
        <button class="nav-btn next">❯</button>
      </div>
    </div>
  `;

  // Set up contact and hire me popups
  document.querySelectorAll('.contact-btn, .profile button').forEach(btn => {
    btn.addEventListener('click', () => {
      popupOverlay.innerHTML = emailPopupHTML;
      showPopup();
    });
  });

  // Set up banner popups
  document.querySelectorAll('.banner-img').forEach(banner => {
    banner.addEventListener('click', function() {
      popupOverlay.innerHTML = bannerPopupHTML;
      const img = popupOverlay.querySelector('.popup-banner-img');
      img.src = this.src;
      img.alt = this.alt;
      showPopup();
    });
  });

  function showPopup() {
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close popup handler
  popupOverlay.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup-close') || e.target === this) {
      popupOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Copy email handler
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup-copy')) {
      navigator.clipboard.writeText('vanshchauhan0478@gmail.com')
        .then(() => {
          e.target.textContent = 'Copied!';
          setTimeout(() => {
            e.target.textContent = 'Copy Email';
          }, 2000);
        });
    }
  });

  // Banner navigation
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-btn')) {
      const banners = document.querySelectorAll('.banner-img');
      const currentImg = popupOverlay.querySelector('.popup-banner-img');
      const currentIndex = Array.from(banners).findIndex(
        img => img.src === currentImg.src
      );
      
      let newIndex = e.target.classList.contains('next')
        ? (currentIndex + 1) % banners.length
        : (currentIndex - 1 + banners.length) % banners.length;
      
      currentImg.src = banners[newIndex].src;
      currentImg.alt = banners[newIndex].alt;
    }
  });

  // Escape key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      popupOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});
