/**
 * FORM3D Landing Page - Vanilla JavaScript
 * Handles mobile menu, copy link, and HubSpot embed submit UX.
 */

(function () {
  'use strict';

  // ============================================
  // HubSpot Embed Form - Optional UX Hook
  // ============================================

  const formMessage = document.getElementById('form-message');

  function showMessage(text, isSuccess) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = 'hero__form-message ' + (isSuccess ? 'success' : 'error');
    formMessage.hidden = false;
  }

  function hideMessage() {
    if (!formMessage) return;
    formMessage.hidden = true;
    formMessage.textContent = '';
    formMessage.className = 'hero__form-message';
  }

  // Optional: If HubSpot embed is present, we can listen for a custom event
  // BUT HubSpot doesn't automatically emit events globally.
  // Best practice: attach onFormSubmitted in index.html's hbspt.forms.create.
  // This file keeps a helper function available globally for index.html to call.

  window.__FORM3D__HS = window.__FORM3D__HS || {};
  window.__FORM3D__HS.onSubmitted = function () {
    // Hide any old error/success first
    hideMessage();

    // Show success message
    showMessage('Thanks! Check your email for the installer link.', true);

    // Desktop: Open SketchUp Extension Store in NEW TAB
    // And REFRESH the current page immediately (so user sees form upon return)
    // if (window.innerWidth > 768) {
    //   // window.open('https://extensions.sketchup.com/extension/3438e2e4-b335-48a9-835a-5bc70f3c841f/form3d-ai-furniture-to-3d-model-converter', '_blank');
    //   window.location.reload();
    // }
  };

  // ============================================
  // Mobile Menu Toggle
  // ============================================

  const headerToggle = document.querySelector('.header__toggle');
  const headerMenu = document.querySelector('.header__menu');

  if (headerToggle && headerMenu) {
    headerToggle.addEventListener('click', function () {
      headerMenu.classList.toggle('is-open');
      headerToggle.classList.toggle('is-open'); // Animate icon
      headerToggle.setAttribute('aria-expanded', headerMenu.classList.contains('is-open'));
    });

    // Close menu when clicking a link (for in-page anchors)
    headerMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          headerMenu.classList.remove('is-open');
          headerToggle.classList.remove('is-open'); // Reset icon
          headerToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }



  // ============================================
  // Gallery Lightbox
  // ============================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox__img');
  const closeBtn = document.querySelector('.lightbox__close');
  const prevBtn = document.querySelector('.lightbox__prev');
  const nextBtn = document.querySelector('.lightbox__next');
  const galleryCards = document.querySelectorAll('.gallery__card img');

  let currentIndex = 0;
  const totalImages = galleryCards.length;

  if (lightbox && galleryCards.length > 0) {
    // Open Lightbox
    galleryCards.forEach((img, index) => {
      img.parentElement.addEventListener('click', () => {
        currentIndex = index;
        updateLightboxImage();
        openLightbox();
      });
    });

    // Close Lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox__overlay').addEventListener('click', closeLightbox);

    // Navigation
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateLightboxImage();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalImages;
      updateLightboxImage();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });

    function openLightbox() {
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function updateLightboxImage() {
      const src = galleryCards[currentIndex].src;
      lightboxImg.src = src;
    }
  }
})();
