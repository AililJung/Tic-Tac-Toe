let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let gameWon = false;

const gameBoard = document.getElementById("gameBoard");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetButton");

//Функция для создания игрового поля
function createBoard() {
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.setAttribute("data-index", index);
        cellDiv.addEventListener("click", handleCellClick);
        cellDiv.textContent = cell;
        gameBoard.appendChild(cellDiv);
    });
}

//Обработка кликов по ячейке
function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");

    //Проверка, что ячейка пустая и игра не окончена
    if (board[index] === "" && !gameWon) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            message.textContent = `Игрок ${currentPlayer} победил!`;
            gameWon = true;
        } else if (boardFull()) {
            message.textContent = "Ничья!";
        } else {
            currentPlayer = currentPlayer === 'X' ? "O" : "X";
            message.textContent = `Игрок ${currentPlayer} ходит`
        }
    }
}

//Проверка победителя
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
       const [a, b, c] = combination;
       return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

//Проверка, заполнено ли поле
function boardFull() {
    return board.every(cell => cell !== "");
}

//Функция для сброса игры
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameWon = false;
    message.textContent = `Игрок ${currentPlayer} ходит`;
    createBoard();
}

//Добавление обработчика для кнопки сброса
resetButton.addEventListener("click", resetGame);

//Создание игрового поля при загрузке Страницы
createBoard();
message.textContent = `Игрок ${currentPlayer} ходит`;