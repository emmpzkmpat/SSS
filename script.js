const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const appleCounter = document.getElementById('appleCounter'); // Contador de manzanas

// Ajuste del tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tamaño de la cuadricula y velocidad de la serpiente
const gridSize = 20; // tamaño de cada celda de la serpiente y la comida
let snakeSpeed = 40; // velocidad de la serpiente en milisegundos

// Ajuste de la velocidad para dispositivos móviles
if (navigator.userAgent.match(/Mobi/)) {
    snakeSpeed = 58; // Velocidad más lenta en dispositivos móviles
}

// Configuración inicial de la serpiente y comida
let snake = [{ x: Math.floor(canvas.width / 2 / gridSize) * gridSize, y: Math.floor(canvas.height / 2 / gridSize) * gridSize }];
let snakeLength = 1;
let direction = { x: gridSize, y: 0 }; // Movimiento inicial a la derecha
let food = { x: randomPosition(canvas.width), y: randomPosition(canvas.height) };
let gameOver = false;
let pointsEaten = 0; // Contador de puntos comidos

// Función para obtener una posición aleatoria dentro del canvas
function randomPosition(max) {
    return Math.floor(Math.random() * (max / gridSize)) * gridSize;
}

// Función para dibujar la serpiente y la comida
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Dibujar la serpiente
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Actualizar el contador de manzanas
    appleCounter.textContent = `Manzanas: ${pointsEaten}`;
}

// Función para mover la serpiente
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Comprobar colisiones con los límites del canvas
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
        return;
    }

    // Comprobar colisiones con el cuerpo de la serpiente
    snake.forEach(segment => {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver = true;
            return;
        }
    });

    if (gameOver) {
        alert('¡Juego terminado!');
        document.location.reload();
        return;
    }

    // Añadir nueva posición de la cabeza al principio del array de la serpiente
    snake.unshift(head);

    // Comprobar si la serpiente ha comido la comida
    if (head.x === food.x && head.y === food.y) {
        pointsEaten++;
        // Generar nueva posición de la comida
        food = { x: randomPosition(canvas.width), y: randomPosition(canvas.height) };

        // Verificar la condición de redirección
        if (pointsEaten == 20) {
            if (Math.random() < 1 / 8) {
                window.location.href = 'https://emmpzkmpat.github.io/BLACK/'; // Reemplaza con tu enlace
                return;
            }
        } else if (pointsEaten == 10) {
            if (Math.random() < 1 / 2) {
                window.location.href = 'https://youtu.be/dQw4w9WgXcQ?si=cJstPTBTRJHEGwmA'; // Reemplaza con tu enlace
                return;
            }
        }

        snakeLength++;
    } else {
        snake.pop(); // Eliminar el último segmento de la serpiente si no ha crecido
    }

    drawGame();
}

// Control del teclado para cambiar la dirección de la serpiente
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

// Control táctil para cambiar la dirección de la serpiente
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevenir el comportamiento de desplazamiento por defecto
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

canvas.addEventListener('touchend', (event) => {
    event.preventDefault();
    const touch = event.changedTouches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Movimiento horizontal
        if (diffX > 0) {
            if (direction.x === 0) direction = { x: gridSize, y: 0 }; // Derecha
        } else {
            if (direction.x === 0) direction = { x: -gridSize, y: 0 }; // Izquierda
        }
    } else {
        // Movimiento vertical
        if (diffY > 0) {
            if (direction.y === 0) direction = { x: 0, y: gridSize }; // Abajo
        } else {
            if (direction.y === 0) direction = { x: 0, y: -gridSize }; // Arriba
        }
    }
});

// Bucle principal del juego
function gameLoop() {
    if (!gameOver) {
        moveSnake();
        setTimeout(gameLoop, snakeSpeed);
    }
}

// Iniciar el juego
drawGame();
gameLoop();
