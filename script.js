// Define initial game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // Human plays as 'X'
let isGameActive = true;
const statusDisplay = document.querySelector('.status');

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Update status message
const updateStatusMessage = () => {
  if (isGameActive) {
    statusDisplay.textContent = currentPlayer === 'X'
      ? "It's your turn"
      : "Computer is thinking...";
  }
};

// Check for a winner or tie
const checkGameStatus = () => {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    if (currentPlayer === 'X') {
      statusDisplay.textContent = "You won!";
    } else {
      statusDisplay.textContent = "You lost!";
    }
    isGameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusDisplay.textContent = "It's a tie!";
    isGameActive = false;
  }
};

// Minimax Algorithm
const minimax = (newBoard, depth, isMaximizing) => {
  // Check for a winner
  let scores = { X: -1, O: 1, tie: 0 };
  let result = checkWinner(newBoard);
  if (result !== null) return scores[result];

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === '') {
        newBoard[i] = 'O'; // Computer's turn
        let score = minimax(newBoard, depth + 1, false);
        newBoard[i] = ''; // Undo move
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === '') {
        newBoard[i] = 'X'; // Human's turn
        let score = minimax(newBoard, depth + 1, true);
        newBoard[i] = ''; // Undo move
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

// Check for winner
const checkWinner = (board) => {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winner ('X' or 'O')
    }
  }
  return board.includes('') ? null : 'tie'; // Return 'tie' if board is full
};

// Computer (O) makes a smart move
const computerMove = () => {
  if (!isGameActive) return;

  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'O'; // Try the move
      let score = minimax(board, 0, false);
      board[i] = ''; // Undo move
      if (score > bestScore) {
        bestScore = score;
        move = i; // Save the best move
      }
    }
  }

  board[move] = 'O'; // Make the best move
  document.querySelector(`.cell[data-index="${move}"]`).textContent = 'O';

  checkGameStatus();

  if (isGameActive) {
    currentPlayer = 'X'; // Switch back to Human's turn
    updateStatusMessage();
  }
};

// Handle human (X) player's move
const handleCellClick = (event) => {
  const clickedCell = event.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (board[cellIndex] !== '' || !isGameActive || currentPlayer !== 'X') return;

  board[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkGameStatus();

  if (isGameActive) {
    currentPlayer = 'O'; // Switch to Computer's turn
    updateStatusMessage();
    setTimeout(computerMove, 500); // Give a slight delay for more natural feel
  }
};

// Restart game
const handleRestart = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X'; // Human always starts
  isGameActive = true;
  document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ''));
  statusDisplay.textContent = "It's your turn";
};

// Add event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestart);

// Set initial status message
updateStatusMessage();
