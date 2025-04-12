// Complete Popup Gallery System
document.addEventListener('DOMContentLoaded', function() {
  // Create popup overlay
  const popup = document.createElement('div');
  popup.className = 'popup-overlay';
  document.body.appendChild(popup);

  // Get all gallery images
  const images = document.querySelectorAll('.banner-img');
  
  // Add click handlers
  images.forEach(img => {
    img.addEventListener('click', function() {
      // Get current image index
      const currentIndex = Array.from(images).indexOf(this);
      
      // Create popup content
      popup.innerHTML = `
        <div class="popup-content">
          <img src="${this.src}" alt="${this.alt}" class="popup-img">
          <button class="nav-arrow prev">❮</button>
          <button class="nav-arrow next">❯</button>
          <button class="popup-close">×</button>
        </div>
      `;
      
      // Show popup
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Get popup elements
      const popupImg = popup.querySelector('.popup-img');
      const prevBtn = popup.querySelector('.prev');
      const nextBtn = popup.querySelector('.next');
      const closeBtn = popup.querySelector('.popup-close');

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
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
      });

      // Keyboard navigation
      function handleKeyDown(e) {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'Escape') closeBtn.click();
      }

      document.addEventListener('keydown', handleKeyDown);

      // Clean up
      popup.addEventListener('click', function(e) {
        if (e.target === this) {
          closeBtn.click();
          document.removeEventListener('keydown', handleKeyDown);
        }
      });
    });
  });
});
