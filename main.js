// DOM-елементи
const weightInput = document.querySelector('input[placeholder="Вага"]');
const heightInput = document.querySelector('input[placeholder="Ріст"]');
const addButton = document.querySelector('button');
const waterNormLabel = document.querySelector('.norm-label');
const consumedLabel = document.querySelector('.right p:nth-of-type(2)');
const waterInput = document.querySelector('input[placeholder="мл"]');
const waterLevel = document.querySelector('.water-level');
const waterNormDisplay = document.querySelector('.liters');
const resetButton = document.getElementById('reset-button');
const message = document.querySelector('.congrats-message');

// Дані
let waterNorm = 0;
let consumedWater = 0;

// Додавання ваги та росту
addButton.addEventListener('click', () => {
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);

  if (!weight || weight <= 0 || !height || height <= 0) {
    alert('Введіть коректні значення ваги і росту!');
    return;
  }

  // Формула з урахуванням росту
  waterNorm = weight * 35;
  consumedWater = 0;

  updateDisplay();
});

// Введення випитої води
const addWaterButton = document.getElementById('add-water');

addWaterButton.addEventListener('click', () => {
  const addedWater = parseFloat(waterInput.value);
  if (!addedWater || addedWater <= 0) {
    alert('Введіть коректну кількість води!');
    return;
  }

  consumedWater += addedWater;
  if (consumedWater > waterNorm) consumedWater = waterNorm;

  updateDisplay();
  waterInput.value = ''; // Очищаємо поле після додавання
});

// Кнопка скидання
resetButton.addEventListener('click', () => {
  consumedWater = 0;
  localStorage.setItem('consumedWater', consumedWater);
  updateDisplay();
});

// Оновлення інтерфейсу
function updateDisplay() {
  const normLiters = (waterNorm / 1000).toFixed(2);
  const consumedLiters = (consumedWater / 1000).toFixed(2);

  waterNormLabel.textContent = `Your norm: ${normLiters} л`;
  consumedLabel.textContent = `Consumed in a day: ${consumedLiters} л`;
  waterNormDisplay.textContent = `${normLiters} л`;

  const percent = waterNorm ? (consumedWater / waterNorm) * 100 : 0;
  waterLevel.style.height = `${Math.min(percent, 100)}%`;

  if (percent < 50) {
    waterLevel.style.backgroundColor = '#6ec1e4';
  } else if (percent < 90) {
    waterLevel.style.backgroundColor = '#1e90ff';
  } else {
    waterLevel.style.backgroundColor = '#00b894';
  }

  // Повідомлення
  if (percent >= 100) {
    message.style.display = 'block';
  } else {
    message.style.display = 'none';
  }

  // Зберігаємо
  localStorage.setItem('waterNorm', waterNorm);
  localStorage.setItem('consumedWater', consumedWater);
}

// Відновлення збережених даних
window.addEventListener('load', () => {
  const savedNorm = localStorage.getItem('waterNorm');
  const savedConsumed = localStorage.getItem('consumedWater');

  if (savedNorm) waterNorm = parseFloat(savedNorm);
  if (savedConsumed) consumedWater = parseFloat(savedConsumed);

  updateDisplay();
});