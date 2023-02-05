function cgolGelatinousCubeTransition(board: (number | null)[][]): (number | null)[][] {
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
          let neighborCoordinates = [] as [number, number, number][];
          for (let i = -1; i <= 1; i++) {
              for (let j = -1; j <= 1; j++) {
                  if (i === 0 && j === 0) {
                      continue;
                  }
                  const x = row + i;
                  const y = col + j;
                  if (x >= 0 && x < rows && y >= 0 && y < cols && board[x][y] !== null) {
                    liveNeighbors[board[x][y]!] = (liveNeighbors[board[x][y]!] || 0) + 1;
                    neighborCoordinates.push([board[x][y]!, x, y]);
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
              const liveNeighborKeys = Object.keys(liveNeighbors);
              // CASE 1: If there is only one neighboring organism, that is the cell that will spawn
              if (liveNeighborKeys.length === 1) {
                newBoard[row][col] = parseInt(Object.keys(liveNeighbors)[0]);
              // CASE 2: If there are two neighboring organisms, the cell that spawns is determined by the majority of immediate neighboring cells
              } else if (liveNeighborKeys.length === 2) {
                newBoard[row][col] = parseInt(liveNeighborKeys.reduce((a, b) => liveNeighbors[a] > liveNeighbors[b] ? a : b ));
              } else {
                const neighboringOrganismSizes = neighborCoordinates.reduce((acc, [neighborKey, x, y]) => {
                    acc[neighborKey.toString()] = findOrganismSize(neighborKey, board, x, y);
                    return acc
                }, {} as { [key: string]: number });

                // CASE 3A: If there are three neighboring organisms of equal size, the cell that spawns is the one closest to 0,0
                const allOrganismSizes = Object.values(neighboringOrganismSizes);
                if (allOrganismSizes.every(size => size === allOrganismSizes[0])) {
                    // Find the value closest to 0,0. Return the first element of the storage array representing the key
                    newBoard[row][col] = findClosestToZeroZero(neighborCoordinates)[0];
                } else {
                // CASE 3B: If there are three neighboring organisms, the cell that spawns is determined by the cluster of cells with the largest size
                    newBoard[row][col] = parseInt(liveNeighborKeys.reduce((a, b) => neighboringOrganismSizes[a] > neighboringOrganismSizes[b] ? a : b ));
                }
              }
          }
      }
  }

  // Return the updated board
  return newBoard;
}

function findOrganismSize(target: number, board: (number | null)[][], row: number, column: number): number {
    // Return immediately if starting coordinate is null
    if (board[row][column] !== target) {
        return 0;
    }

    // Create a set to track visited cells and a queue to track cells to visit
    const visited = new Set<string>();
    const queue = [[row, column]];

    let size = 0;

    while (queue.length > 0) {

        // Get the next cell to visit
        const [x, y] = queue.shift()!;

        // Track which cells have been visited
        if (visited.has(`${x},${y}`)) {
            continue;
        }
        visited.add(`${x},${y}`);

        // Return before incrementing if the cell is empty
        if (board[x][y] !== target) {
            continue;
        }

        // Increment if the cell is not empty and is the target organism
        size++;

        // Horizontals
        const xIsOverMin = x > 0;
        const xIsUnderMax = x < board.length - 1;
        if (xIsOverMin) { queue.push([x - 1, y]) }
        if (xIsUnderMax) { queue.push([x + 1, y]) }
        
        // Verticals
        const yIsOverMin = y > 0;
        const yIsUnderMax = y < board[0].length - 1;
        if (yIsOverMin) { queue.push([x, y - 1]) }
        if (yIsUnderMax) { queue.push([x, y + 1]) }

        // Diagonals
        if (xIsOverMin && yIsOverMin) { queue.push([x - 1, y - 1]) }
        if (xIsOverMin && yIsUnderMax) { queue.push([x - 1, y + 1]) }
        if (xIsUnderMax && yIsOverMin) { queue.push([x + 1, y - 1]) }
        if (xIsUnderMax && yIsUnderMax) { queue.push([x + 1, y + 1]) }

    }

    return size;
}

const findClosestToZeroZero = (coordinates: [number, number, number][]) => {
    let closestCoordinate: [number, number, number] = coordinates[0];
    let closestDistance = Number.MAX_SAFE_INTEGER;
  
    for (const coordinate of coordinates) {
      const distance = Math.sqrt(Math.pow(coordinate[1], 2) + Math.pow(coordinate[2], 2));
      console.log(`distance: ${distance}, cubeType: ${coordinate[0]}`)
      if (distance < closestDistance) {
        closestCoordinate = coordinate;
        closestDistance = distance;
      }
    }
  
    return closestCoordinate;
  };






function slimePathTransition(gelatinousCubes: (number | null)[][], slimePaths: (number | null)[][]): (number | null)[][] {
    for (let row = 0; row < slimePaths.length; row++) {
        for (let col = 0; col < slimePaths[0].length; col++) {
            const cube = gelatinousCubes[row][col];
            const slimePath = slimePaths[row][col];
            if (cube !== null) {
                if (cube !== slimePath) {
                    slimePaths[row][col] = cube;
                }
            }
        }
    }
    return slimePaths;
}

export { cgolGelatinousCubeTransition, slimePathTransition, findOrganismSize };