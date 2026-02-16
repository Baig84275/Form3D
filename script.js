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

    // Optional: hide the form after submit (if you want)
    // const hubspotWrap = document.getElementById('hubspotForm');
    // if (hubspotWrap) hubspotWrap.style.display = 'none';
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
  // Copy Link (Video Section)
  // ============================================

  const copyLinkBtn = document.querySelector('.video-chrome__copy');
  const copyLinkOriginalHTML = copyLinkBtn ? copyLinkBtn.innerHTML : '';

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function () {
      const url = window.location.href;

      navigator.clipboard
        .writeText(url)
        .then(function () {
          copyLinkBtn.innerHTML = 'Copied!';
          setTimeout(function () {
            copyLinkBtn.innerHTML = copyLinkOriginalHTML;
          }, 2000);
        })
        .catch(function () {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = url;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);

          copyLinkBtn.innerHTML = 'Copied!';
          setTimeout(function () {
            copyLinkBtn.innerHTML = copyLinkOriginalHTML;
          }, 2000);
        });
    });
  }
})();
