// Enhanced Popup Gallery with Arrows and Close Button
document.addEventListener('DOMContentLoaded', function() {
  const popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay';
  document.body.appendChild(popupOverlay);

  // Handle all gallery images
  document.querySelectorAll('.banner-img').forEach(img => {
    img.addEventListener('click', function() {
      const images = document.querySelectorAll('.banner-img');
      const currentIndex = Array.from(images).indexOf(this);
      
      const popupHTML = `
        <div class="popup-content">
          <button class="popup-close-btn">×</button>
          <img class="popup-img" src="${this.src}" alt="${this.alt}">
          <button class="nav-arrow prev">❮</button>
          <button class="nav-arrow next">❯</button>
        </div>
      `;
      
      popupOverlay.innerHTML = popupHTML;
      popupOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Get DOM elements
      const popupImg = popupOverlay.querySelector('.popup-img');
      const prevBtn = popupOverlay.querySelector('.prev');
      const nextBtn = popupOverlay.querySelector('.next');
      const closeBtn = popupOverlay.querySelector('.popup-close-btn');

      // Navigation function
      function showImage(index) {
        popupImg.src = images[index].src;
        popupImg.alt = images[index].alt;
      }

      // Event listeners
      prevBtn.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(newIndex);
      });

      nextBtn.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % images.length;
        showImage(newIndex);
      });

      closeBtn.addEventListener('click', () => {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      });

      // Keyboard navigation
      function handleKeyDown(e) {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'Escape') closeBtn.click();
      }

      document.addEventListener('keydown', handleKeyDown);

      // Cleanup on close
      popupOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
          closeBtn.click();
          document.removeEventListener('keydown', handleKeyDown);
        }
      });
    });
  });
});
