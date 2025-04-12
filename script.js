document.addEventListener('DOMContentLoaded', function() {
  const banners = document.querySelectorAll('.banner-img');
  const popup = document.querySelector('.banner-popup');
  const popupImg = document.querySelector('.popup-banner-img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const closeBtn = document.querySelector('.close-popup');
  
  let currentIndex = 0;

  // Open popup when banner is clicked
  banners.forEach((banner, index) => {
    banner.addEventListener('click', () => {
      currentIndex = index;
      updatePopupImage();
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Navigation functions
  function updatePopupImage() {
    popupImg.src = banners[currentIndex].src;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % banners.length;
    updatePopupImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + banners.length) % banners.length;
    updatePopupImage();
  }

  // Event listeners for navigation
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!popup.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'Escape') {
      popup.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});
