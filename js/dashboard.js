// Simulate dashboard progress
window.addEventListener('DOMContentLoaded', () => {
  const progress = document.querySelector('.points-card .progress');
  if (progress) {
    setTimeout(() => {
      progress.style.width = '70%';
    }, 400);
  }
});
