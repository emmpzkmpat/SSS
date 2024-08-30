const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const appleCounter = document.getElementById('appleCounter'); // Contador de manzanas

// Ajuste del tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tamaño de la cuadricula y velocidad de la serpiente
const gridSize = 20; // tamaño de cada celda de la serpiente y la comida
let snakeSpeed = 40; // velocidad de la serpiente en milisegundos

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

        if (pointsEaten >= 100) {
            // Comprobar la probabilidad de redirección para 100 puntos
            if (Math.random() < 1 / 5) {
                // Redirigir a un enlace
                window.location.href = 'https://emmpzkmpat.github.io/BLACK/'; // Reemplaza con tu enlace
                return;
            }
            // Reiniciar el contador de puntos comidos
            pointsEaten = 0;

        } else if (pointsEaten >= 30) {
            // Comprobar la probabilidad de redirección para 30 puntos
            if (Math.random() < 1 / 2) {
                // Redirigir a un enlace
                window.location.href = 'https://youtu.be/dQw4w9WgXcQ?si=cJstPTBTRJHEGwmA'; // Reemplaza con tu enlace
                return;
            }
            // Reiniciar el contador de puntos comidos
            pointsEaten = 0;
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
canvas.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    if (x < canvas.width / 2 && y < canvas.height / 2) {
        direction = { x: 0, y: -gridSize }; // Arriba
    } else if (x < canvas.width / 2 && y > canvas.height / 2) {
        direction = { x: 0, y: gridSize }; // Abajo
    } else if (x > canvas.width / 2 && y < canvas.height / 2) {
        direction = { x: -gridSize, y: 0 }; // Izquierda
    } else if (x > canvas.width / 2 && y > canvas.height / 2) {
        direction = { x: gridSize, y: 0 }; // Derecha
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
