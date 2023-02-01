function gameOfLifeTransition(board: (number | null)[][]): (number | null)[][] {
  // Create a copy of the original board to avoid modifying it in place
  const newBoard = board.map(row => row.slice());

  // Determine the number of rows and columns in the board
  const rows = board.length;
  const cols = board[0].length;

  // Loop through each cell in the board
  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
          // Count the number of live neighbors for the current cell
          let liveNeighbors = 0;
          for (let i = -1; i <= 1; i++) {
              for (let j = -1; j <= 1; j++) {
                  if (i === 0 && j === 0) {
                      continue;
                  }
                  const x = row + i;
                  const y = col + j;
                  if (x >= 0 && x < rows && y >= 0 && y < cols && board[x][y] === 1) {
                      liveNeighbors++;
                  }
              }
          }

          // Apply the rules of the Game of Life to determine the state of the current cell in the next generation
          if (board[row][col] === 1) {
              if (liveNeighbors < 2 || liveNeighbors > 3) {
                  newBoard[row][col] = null;
              }
          } else if (liveNeighbors === 3) {
              newBoard[row][col] = 1;
          }
      }
  }

  // Return the updated board
  return newBoard;
}

export default gameOfLifeTransition;