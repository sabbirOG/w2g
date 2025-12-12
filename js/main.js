// Auth Modal Logic for Home Page
document.addEventListener('DOMContentLoaded', function() {
  // Find the Get Started button in the hero section
  var getStartedBtn = document.getElementById('hero-get-started');
  var modal = document.getElementById('auth-modal');
  var closeBtn = document.getElementById('auth-modal-close');
  var showLogin = document.getElementById('show-login');
  var showSignup = document.getElementById('show-signup');
  var loginWrap = document.getElementById('login-form-wrap');
  var signupWrap = document.getElementById('signup-form-wrap');
  if (getStartedBtn && modal) {
    getStartedBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'flex';
      loginWrap.style.display = '';
      signupWrap.style.display = 'none';
    });
  }
  if (closeBtn && modal) {
    closeBtn.onclick = function() { modal.style.display = 'none'; };
  }
  if (showLogin && showSignup && loginWrap && signupWrap) {
    showLogin.onclick = function() {
      loginWrap.style.display = '';
      signupWrap.style.display = 'none';
    };
    showSignup.onclick = function() {
      loginWrap.style.display = 'none';
      signupWrap.style.display = '';
    };
  }
  // Close modal on outside click
  window.onclick = function(event) {
    if (event.target === modal) modal.style.display = 'none';
  };

  // Modal login logic
  var modalLoginForm = document.getElementById('modal-login-form');
  var modalLoginError = document.getElementById('modal-login-error');
  if (modalLoginForm) {
    modalLoginForm.onsubmit = function(e) {
      e.preventDefault();
      var user = modalLoginForm.username.value.trim();
      var pass = modalLoginForm.password.value;
      if (user === 'demo' && pass === 'demo123') {
        localStorage.setItem('w2g_logged_in', 'true');
        window.location.href = 'html/dashboard.html';
      } else {
        modalLoginError.textContent = 'Invalid credentials. Use demo / demo123.';
      }
    };
  }
  // Modal signup logic (demo: only demo/demo123 can login)
  var modalSignupForm = document.getElementById('modal-signup-form');
  var modalSignupError = document.getElementById('modal-signup-error');
  if (modalSignupForm) {
    modalSignupForm.onsubmit = function(e) {
      e.preventDefault();
      modalSignupError.textContent = 'Demo: Only demo/demo123 can login.';
    };
  }
});
// Navbar mobile toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}
// Highlight active nav link
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
