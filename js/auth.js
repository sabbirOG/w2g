// Simple authentication logic for demo
// Demo credentials: username: demo, password: demo123

function isLoggedIn() {
  return localStorage.getItem('w2g_logged_in') === 'true';
}

function setLoggedIn(val) {
  localStorage.setItem('w2g_logged_in', val ? 'true' : 'false');
}

function redirectIfNotLoggedIn() {
  // Only allow index.html without login
  const allowed = [
    '/index.html',
    '/',
    '/w2g/',
    '/w2g/index.html',
    '/w2g',
    '/w2g/html/login.html',
    '/w2g/html/signup.html'
  ];
  const path = window.location.pathname.toLowerCase();
  if (!isLoggedIn() && !allowed.includes(path)) {
    window.location.href = 'html/login.html';
  }
}

// Login form logic
window.addEventListener('DOMContentLoaded', function() {
  redirectIfNotLoggedIn();

  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const user = loginForm.username.value.trim();
      const pass = loginForm.password.value;
      if (user === 'demo' && pass === 'demo123') {
        setLoggedIn(true);
        window.location.href = '../html/dashboard.html';
      } else {
        loginError.textContent = 'Invalid credentials. Use demo / demo123.';
      }
    });
  }

  // Signup form logic (demo: just allow any signup, but only demo can login)
  const signupForm = document.getElementById('signupForm');
  const signupError = document.getElementById('signupError');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      signupError.textContent = 'Demo: Only demo/demo123 can login.';
    });
  }
});

// Logout helper (can be called from nav if needed)
function w2gLogout() {
  setLoggedIn(false);
  window.location.href = '../index.html';
}
