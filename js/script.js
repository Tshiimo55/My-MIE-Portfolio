(function initNavMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });


  

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

}());




(function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute('href');

    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

}());




(function initContactForm() {
  const form = document.getElementById('contact-form');

  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('form-status');

  /* --- Helper: show an error message for a field --- */
  function showError(input, errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    input.classList.add('input-error');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  /* --- Helper: clear an error message for a field --- */
  function clearError(input, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    input.classList.remove('input-error');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  /* --- Helper: validate email format --- */
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  /* --- Validate a single field on blur (when user leaves the field) --- */
  nameInput.addEventListener('blur', function () {
    if (nameInput.value.trim() === '') {
      showError(nameInput, 'name-error', 'Please enter your full name.');
    } else {
      clearError(nameInput, 'name-error');
    }
  });

  emailInput.addEventListener('blur', function () {
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'email-error', 'Please enter your email address.');
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'email-error', 'Please enter a valid email address.');
    } else {
      clearError(emailInput, 'email-error');
    }
  });

  messageInput.addEventListener('blur', function () {
    if (messageInput.value.trim() === '') {
      showError(messageInput, 'message-error', 'Please enter a message.');
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'message-error', 'Your message must be at least 10 characters.');
    } else {
      clearError(messageInput, 'message-error');
    }
  });

  /* --- Full validation on submit --- */
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    /* Validate name */
    if (nameInput.value.trim() === '') {
      showError(nameInput, 'name-error', 'Please enter your full name.');
      isValid = false;
    } else {
      clearError(nameInput, 'name-error');
    }

    /* Validate email */
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'email-error', 'Please enter your email address.');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'email-error', 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput, 'email-error');
    }

    /* Validate message */
    if (messageInput.value.trim() === '') {
      showError(messageInput, 'message-error', 'Please enter a message.');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'message-error', 'Your message must be at least 10 characters.');
      isValid = false;
    } else {
      clearError(messageInput, 'message-error');
    }

    /* If all fields are valid, show success message and reset form */
    if (isValid) {
      formStatus.textContent = 'Thank you! Your message has been sent.';
      formStatus.style.color = 'var(--accent)';
      form.reset();

      /* Clear success message after 5 seconds */
      setTimeout(function () {
        formStatus.textContent = '';
      }, 5000);
    }
  });

}());