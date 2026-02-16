/**
 * FORM3D Landing Page - Vanilla JavaScript
 * Handles form validation, success messaging, mobile menu, and optional lead submit hook.
 */

(function () {
  'use strict';

  // ============================================
  // Form Handling
  // ============================================

  const form = document.getElementById('lead-form');
  const firstNameInput = document.getElementById('firstName');
  const emailInput = document.getElementById('email');
  const formMessage = document.getElementById('form-message');

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Optional hook for HubSpot / API integration.
   * Call with lead data on successful form submission.
   * @param {Object} data - { firstName: string, email: string }
   */
  function onLeadSubmit(data) {
    // Placeholder: connect your HubSpot or API here
    if (typeof window.onLeadSubmit === 'function') {
      window.onLeadSubmit(data);
    }
    // Example: console.log('Lead submitted:', data);
  }

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

  function validateForm() {
    hideMessage();
    let isValid = true;
    if (!firstNameInput || !emailInput) return false;

    // Remove previous error states
    firstNameInput.classList.remove('error');
    emailInput.classList.remove('error');

    // Validate first name
    const firstName = firstNameInput.value.trim();
    if (!firstName) {
      firstNameInput.classList.add('error');
      isValid = false;
    }

    // Validate email
    const email = emailInput.value.trim();
    if (!email) {
      emailInput.classList.add('error');
      isValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      emailInput.classList.add('error');
      showMessage('Please enter a valid email address.', false);
      return false;
    }

    if (!isValid) {
      showMessage('Please fill in all required fields.', false);
    }

    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const firstName = firstNameInput.value.trim();
    const email = emailInput.value.trim();

    // Call optional hook
    onLeadSubmit({ firstName, email });

    // Show success message (inline, no page refresh)
    showMessage('Thanks! Check your email for the installer link.', true);

    // Reset form
    form.reset();

    // Remove error classes
    firstNameInput.classList.remove('error');
    emailInput.classList.remove('error');
  }

  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  // ============================================
  // Mobile Menu Toggle
  // ============================================

  const headerToggle = document.querySelector('.header__toggle');
  const headerMenu = document.querySelector('.header__menu');

  if (headerToggle && headerMenu) {
    headerToggle.addEventListener('click', function () {
      headerMenu.classList.toggle('is-open');
      headerToggle.setAttribute('aria-expanded', headerMenu.classList.contains('is-open'));
    });

    // Close menu when clicking a link (for in-page anchors)
    headerMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          headerMenu.classList.remove('is-open');
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
      navigator.clipboard.writeText(url).then(function () {
        copyLinkBtn.innerHTML = 'Copied!';
        setTimeout(function () {
          copyLinkBtn.innerHTML = copyLinkOriginalHTML;
        }, 2000);
      }).catch(function () {
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
