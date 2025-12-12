// Move demo button logic outside submit handler so it works immediately
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const demoBtn = document.getElementById('demoBtn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const userTypeSelect = document.getElementById('userType');


  // Autofill demo credentials
  demoBtn.addEventListener('click', function () {
    emailInput.value = 'demo@w2g.com';
    passwordInput.value = 'demo123';
    userTypeSelect.value = 'household';
  });

  // Show/hide password toggle
  const togglePassword = document.getElementById('togglePassword');
  togglePassword.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePassword.textContent = 'Hide';
    } else {
      passwordInput.type = 'password';
      togglePassword.textContent = 'Show';
    }
  });

  // Handle login
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const userType = userTypeSelect.value;

    if (!email || !password || !userType) {
      alert('Please fill in all fields.');
      return;
    }

    // Demo credentials logic
    if (email === 'demo@w2g.com' && password === 'demo123') {
      // Simulate successful login
      localStorage.setItem('w2g_logged_in', 'true');
      alert('Demo login successful! Redirecting...');
      window.location.href = 'html/dashboard.html';
      return;
    }

    // Simulate login for other users (for demo only)
    localStorage.setItem('w2g_logged_in', 'true');
    alert('Login successful! Redirecting...');
    window.location.href = 'html/dashboard.html';
  });
});
