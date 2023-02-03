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
          let liveNeighbors = {} as { [key: string]: number };
          for (let i = -1; i <= 1; i++) {
              for (let j = -1; j <= 1; j++) {
                  if (i === 0 && j === 0) {
                      continue;
                  }
                  const x = row + i;
                  const y = col + j;
                  if (x >= 0 && x < rows && y >= 0 && y < cols && board[x][y] !== null) {
                    liveNeighbors[board[x][y]!] = (liveNeighbors[board[x][y]!] || 0) + 1;
                  }
              }
          }

          // Apply the rules of the Game of Life to determine the state of the current cell in the next generation
          const liveNeighborsCount = Object.values(liveNeighbors).reduce((a, b) => a + b, 0);
          if (board[row][col] !== null) {
              if (liveNeighborsCount < 2 || liveNeighborsCount > 3) {
                  newBoard[row][col] = null;
              }
          } else if (liveNeighborsCount === 3) {
              // Get max from live neighbors
              // TODO: Handle ties
              const mostFrequentLiveNeighborType = Object.keys(liveNeighbors).reduce((a, b) => liveNeighbors[a] > liveNeighbors[b] ? a : b);
              newBoard[row][col] = parseInt(mostFrequentLiveNeighborType);
          }
      }
  }

  // Return the updated board
  return newBoard;
}

export default gameOfLifeTransition;