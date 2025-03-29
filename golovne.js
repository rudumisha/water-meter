function calculateWater() {
    const weight = document.getElementById('weight').value;
    const recommendedWater = (weight * 0.03).toFixed(2); // Рекомендація: 30 мл води на 1 кг маси тіла
    document.getElementById('recommended').textContent = recommendedWater + " л";
    updateProgress();
  }
  
  function updateProgress() {
    const weight = document.getElementById('weight').value;
    const water = document.getElementById('water').value;
    const recommendedWater = (weight * 0.03).toFixed(2);
  
    const progressBar = document.getElementById('progress');
    const status = document.getElementById('status');
  
    if (water >= recommendedWater) {
      progressBar.style.width = "100%";
      status.textContent = "Норма досягнута!";
      status.style.color = "green";
    } else if (water > 0) {
      const progress = (water / recommendedWater) * 100;
      progressBar.style.width = progress + "%";
      status.textContent = "Не вистачає води";
      status.style.color = "orange";
    } else {
      progressBar.style.width = "0%";
      status.textContent = "Норма";
      status.style.color = "black";
    }
  }
  