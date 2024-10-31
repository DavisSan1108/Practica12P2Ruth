let carQueue = [];
let carColors = ["Naranja", "Rojo", "Verde", "Azul", "Amarillo", "Morado", "Rosa", "Cyan", "Marrón", "Gris"];
let carsPainted = 0;
let timeElapsed = 0;
let gameInterval = null;

const carQueueContainer = document.getElementById('carQueue');
const paintCarButton = document.getElementById('paintCar');
const recordDisplay = document.getElementById('record');
const gameOverMessage = document.getElementById('gameOverMessage');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const restartButton = document.getElementById('restartGame');
let selectedColor = null;

// Paleta de colores
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(option => {
  option.addEventListener('click', function() {
    selectedColor = this.getAttribute('data-color');
    colorOptions.forEach(opt => opt.style.border = '2px solid black');
    this.style.border = '4px solid #0000ff'; // Indicar que este color está seleccionado
  });
});

// Función para agregar un coche a la cola
function addCarToQueue() {
  if (carQueue.length >= 5) {
    endGame();
    return;
  }

  const newCar = {
    id: carQueue.length + 1,
    color: carColors[Math.floor(Math.random() * carColors.length)]
  };
  
  carQueue.push(newCar);
  renderCars();
}

// Función para renderizar los coches en la cola
function renderCars() {
  carQueueContainer.innerHTML = '';
  carQueue.forEach(car => {
    const carDiv = document.createElement('div');
    carDiv.classList.add('car');
    carDiv.setAttribute('data-id', car.id);

    const label = document.createElement('div');
    label.classList.add('car-label');
    label.textContent = car.color;
    
    carDiv.appendChild(label);
    carQueueContainer.appendChild(carDiv);
  });
}

// Función para pintar un coche
function paintCar() {
  if (carQueue.length === 0) {
    alert("No hay coches en la cola.");
    return;
  }

  const firstCar = carQueue[0];

  if (firstCar.color === selectedColor) {
    carQueue.shift(); // Eliminar el coche pintado
    carsPainted++;
    renderCars();
    updateRecord();
  } else {
    alert("Selecciona el color correcto.");
  }

  // Aumentar la velocidad si se pintan 3 coches
  if (carsPainted % 3 === 0 && carsPainted !== 0) {
    clearInterval(gameInterval);
    gameInterval = setInterval(addCarToQueue, 3000); // Aumenta la velocidad a 3 segundos
  }
}

// Función para actualizar el registro de coches pintados
function updateRecord() {
  timeElapsed++;
  recordDisplay.textContent = `Carros pintados: ${carsPainted} | Tiempo: ${timeElapsed} segundos`;
}

// Terminar el juego cuando haya 5 coches en la fila
function endGame() {
  clearInterval(gameInterval);
  paintCarButton.disabled = true;
  gameOverOverlay.style.display = 'flex';
}

// Reiniciar el juego
function restartGame() {
  carQueue = [];
  carsPainted = 0;
  timeElapsed = 0;
  paintCarButton.disabled = false;
  gameOverOverlay.style.display = 'none';
  updateRecord();
  renderCars();
  gameInterval = setInterval(addCarToQueue, 7000); // Reiniciar el intervalo de 7 segundos
}

// Inicializar el juego
function startGame() {
  gameInterval = setInterval(addCarToQueue, 7000); // Ahora cada 7 segundos
}

// Iniciar el temporizador para mostrar el tiempo transcurrido
setInterval(() => {
  timeElapsed++;
  updateRecord();
}, 1000);

// Evento para el botón de pintar coches
paintCarButton.addEventListener('click', paintCar);

// Evento para reiniciar el juego
restartButton.addEventListener('click', restartGame);

// Iniciar el juego al cargar la página
window.onload = startGame;
    