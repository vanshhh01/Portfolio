// Banner Gallery Popup System
document.addEventListener('DOMContentLoaded', function() {
  const banners = document.querySelectorAll('.banner-img');
  const popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay banner-popup';
  document.body.appendChild(popupOverlay);

  // Open banner popup
  banners.forEach((banner, index) => {
    banner.addEventListener('click', function() {
      const popupHTML = `
        <div class="banner-popup-container">
          <img class="banner-popup-img" src="${this.src}" alt="${this.alt}">
          <div class="banner-nav-controls">
            <button class="nav-btn prev" ${index === 0 ? 'disabled' : ''}>Previous</button>
            <button class="nav-btn next" ${index === banners.length-1 ? 'disabled' : ''}>Next</button>
          </div>
          <button class="banner-close-btn">Close</button>
        </div>
      `;
      
      popupOverlay.innerHTML = popupHTML;
      popupOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Navigation handlers
      const prevBtn = popupOverlay.querySelector('.prev');
      const nextBtn = popupOverlay.querySelector('.next');
      const img = popupOverlay.querySelector('.banner-popup-img');

      prevBtn?.addEventListener('click', () => navigateBanners(-1));
      nextBtn?.addEventListener('click', () => navigateBanners(1));

      function navigateBanners(direction) {
        const currentIndex = Array.from(banners).findIndex(
          b => b.src === img.src
        );
        const newIndex = currentIndex + direction;
        
        if (newIndex >= 0 && newIndex < banners.length) {
          img.src = banners[newIndex].src;
          img.alt = banners[newIndex].alt;
          
          prevBtn.disabled = newIndex === 0;
          nextBtn.disabled = newIndex === banners.length - 1;
        }
      }

      // Close handler
      popupOverlay.querySelector('.banner-close-btn').addEventListener('click', () => {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  });

  // Close when clicking outside
  popupOverlay.addEventListener('click', function(e) {
    if (e.target === this) {
      popupOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
      popupOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});
