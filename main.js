
  const weightInput = document.querySelector('input[placeholder="Вага"]');
  const heightInput = document.querySelector('input[placeholder="Ріст"]');
  const waterNormLabel = document.querySelector('.norm-label');
  const addButton = document.querySelector('button');
  const consumedInput = document.querySelector('input[placeholder="мл"]');
  const waterLevel = document.querySelector('.water-level');
  const litersLabel = document.querySelector('.liters');

  let dailyNorm = 2500; // мл за замовчуванням
  let consumed = 0;

  // Рахуємо норму за формулою: вага * 30 (мл на кг)
  function calculateNorm() {
    const weight = parseFloat(weightInput.value);
    if (!isNaN(weight)) {
      dailyNorm = Math.round(weight * 30); // мл
      updateDisplay();
    }
  }

  // Додаємо введену кількість води
  function updateConsumed() {
    const value = parseFloat(consumedInput.value);
    if (!isNaN(value)) {
      consumed += value;
      if (consumed > dailyNorm) consumed = dailyNorm;
      updateDisplay();
    }
  }

  // Оновлюємо інтерфейс
  function updateDisplay() {
    waterNormLabel.textContent = `Your norm: ${dailyNorm} мл`;
    const remaining = Math.max(dailyNorm - consumed, 0);
    const percent = (consumed / dailyNorm) * 100;
    waterLevel.style.height = `${percent}%`;
    litersLabel.textContent = `${(consumed / 1000).toFixed(2)} л / ${(dailyNorm / 1000).toFixed(2)} л`;
  }

  addButton.addEventListener('click', calculateNorm);
  consumedInput.addEventListener('change', updateConsumed);

