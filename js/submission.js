// Waste Submission Form Logic
const wasteForm = document.getElementById('wasteForm');
const submissionResult = document.getElementById('submissionResult');
if (wasteForm) {
  wasteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const type = wasteForm.wasteType.value;
    const amount = wasteForm.amount.value;
    const date = wasteForm.pickupDate.value;
    const time = wasteForm.pickupTime.value;
    // Simulate submission
    submissionResult.textContent = `Thank you! ${amount} kg of ${type.replace('_', ' ')} scheduled for pick-up on ${date} at ${time}. Incentives will be updated soon!`;
    wasteForm.reset();
  });
}
