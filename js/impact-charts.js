// Impact Metrics Pie Charts using Chart.js


// Chart.js plugin to animate center percentage
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    if (!chart.config.options.centerText) return;
    const { ctx, chartArea: { width, height, left, top } } = chart;
    const opts = chart.config.options.centerText;
    if (!opts._start) opts._start = performance.now();
    const now = performance.now();
    const duration = opts.duration || 1200;
    const percent = Math.min(1, (now - opts._start) / duration);
    const displayValue = Math.round(opts.value * percent);
    ctx.save();
    ctx.font = 'bold 1.3em Montserrat, Arial, sans-serif';
    ctx.fillStyle = opts.color || '#2E7D32';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.clearRect(left, top + height/2 - 30, width, 60); // clear center
    ctx.fillText(displayValue + (opts.suffix||''), left + width / 2, top + height / 2);
    ctx.restore();
    if (percent < 1) {
      chart._requestAnimFrame = true;
    }
  },
  afterDraw(chart) {
    if (chart._requestAnimFrame) {
      chart._requestAnimFrame = false;
      requestAnimationFrame(() => chart.draw());
    }
  }
};


function renderImpactCharts() {
  if (typeof Chart === 'undefined') return;
  Chart.register(centerTextPlugin);
  // Destroy previous charts if they exist
  ['wastePie','co2Pie','housePie','jobsPie'].forEach(function(id){
    var el = document.getElementById(id);
    if (el && el.chartInstance) {
      el.chartInstance.destroy();
      el.chartInstance = null;
    }
  });
  // Waste Diverted (80%)
  var wastePie = document.getElementById('wastePie');
  if (wastePie) {
    wastePie.chartInstance = new Chart(wastePie, {
      type: 'pie',
      data: {
        labels: ['Diverted', 'Remaining'],
        datasets: [{
          data: [800, 200],
          backgroundColor: ['#2E7D32', '#A5D6A7'],
        }]
      },
      options: {
        plugins: { legend: { display: false }, title: { display: true, text: 'Waste Diverted (tons)' } },
        responsive: false,
        cutout: '60%',
        centerText: { value: 80, suffix: '%', duration: 1200 }
      }
    });
  }
  // CO2 Reduced (88%)
  var co2Pie = document.getElementById('co2Pie');
  if (co2Pie) {
    co2Pie.chartInstance = new Chart(co2Pie, {
      type: 'pie',
      data: {
        labels: ['Reduced', 'Remaining'],
        datasets: [{
          data: [880, 120],
          backgroundColor: ['#388E3C', '#B2DFDB'],
        }]
      },
      options: {
        plugins: { legend: { display: false }, title: { display: true, text: 'CO₂ Reduced (tons)' } },
        responsive: false,
        cutout: '60%',
        centerText: { value: 88, suffix: '%', duration: 1200 }
      }
    });
  }
  // Households Powered (67%)
  var housePie = document.getElementById('housePie');
  if (housePie) {
    housePie.chartInstance = new Chart(housePie, {
      type: 'pie',
      data: {
        labels: ['Powered', 'Unpowered'],
        datasets: [{
          data: [670, 330],
          backgroundColor: ['#8D6E63', '#FFE082'],
        }]
      },
      options: {
        plugins: { legend: { display: false }, title: { display: true, text: 'Households Powered' } },
        responsive: false,
        cutout: '60%',
        centerText: { value: 67, suffix: '%', duration: 1200 }
      }
    });
  }
  // Jobs Created (42%)
  var jobsPie = document.getElementById('jobsPie');
  if (jobsPie) {
    jobsPie.chartInstance = new Chart(jobsPie, {
      type: 'pie',
      data: {
        labels: ['Created', 'Openings'],
        datasets: [{
          data: [42, 58],
          backgroundColor: ['#1976D2', '#BBDEFB'],
        }]
      },
      options: {
        plugins: { legend: { display: false }, title: { display: true, text: 'Jobs Created' } },
        responsive: false,
        cutout: '60%',
        centerText: { value: 42, suffix: '%', duration: 1200 }
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', function() {
  renderImpactCharts();
  setInterval(renderImpactCharts, 5000);
});
