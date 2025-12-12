document.addEventListener('DOMContentLoaded', function() {

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('aiPredictionForm');
  const resultDiv = document.getElementById('predictionResult');
  const historyList = document.getElementById('predictionHistory');
  const chartCanvas = document.getElementById('wasteChart');

  // Chart data (default)
  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let predicted = [30, 45, 60, 80, 55, 90, 40];
  let average = [25, 35, 50, 60, 45, 70, 30];

  // Draw chart
  function drawChart(predictedArr, averageArr) {
    if (!chartCanvas) return;
    const c = chartCanvas.getContext('2d');
    const w = chartCanvas.width;
    const h = chartCanvas.height;
    const barW = 32;
    const gap = 28;
    const baseY = h - 40;
    c.clearRect(0, 0, w, h);
    for (let i = 0; i < days.length; i++) {
      // Average
      c.fillStyle = '#A5D6A7';
      c.fillRect(40 + i * (barW + gap), baseY - averageArr[i], barW, averageArr[i]);
      // Predicted
      c.fillStyle = '#2E7D32';
      c.fillRect(40 + i * (barW + gap), baseY - predictedArr[i], barW, predictedArr[i] - averageArr[i]);
      // Day label
      c.fillStyle = '#333';
      c.font = 'bold 14px Montserrat, Poppins, Arial';
      c.textAlign = 'center';
      c.fillText(days[i], 40 + i * (barW + gap) + barW / 2, h - 12);
    }
    // Y axis
    c.strokeStyle = '#757575';
    c.beginPath();
    c.moveTo(32, baseY);
    c.lineTo(w - 16, baseY);
    c.stroke();
  }

  // Load history from localStorage
  function loadHistory() {
    const history = JSON.parse(localStorage.getItem('aiPredictionHistory') || '[]');
    historyList.innerHTML = history.length
      ? history.map(item => `<li>${item}</li>`).join('')
      : '<li>No predictions yet.</li>';
  }

  // Initial chart and history
  drawChart(predicted, average);
  loadHistory();

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const type = form.wasteType.value;
      const amount = form.amount.value;
      const date = form.date.value;
      if (!type || !amount || !date) return;
      // Simulate AI prediction (replace with real API if available)
      const peak = Math.round(Number(amount) * (1.1 + Math.random() * 0.3));
      const avg = Math.round(Number(amount) * (0.8 + Math.random() * 0.2));
      const msg = `Predicted for ${date}: Peak = ${peak} kg, Avg = ${avg} kg (${type.charAt(0).toUpperCase() + type.slice(1)})`;
      resultDiv.textContent = msg;
      // Update chart for this week (simulate placing prediction on next day)
      let todayIdx = (new Date(date).getDay() + 6) % 7; // 0=Mon, ..., 6=Sun
      let newPredicted = average.slice();
      newPredicted[todayIdx] = peak;
      drawChart(newPredicted, average);
      // Save to history
      let history = JSON.parse(localStorage.getItem('aiPredictionHistory') || '[]');
      history.unshift(msg);
      if (history.length > 10) history = history.slice(0, 10);
      localStorage.setItem('aiPredictionHistory', JSON.stringify(history));
      loadHistory();
    });
  }
});
