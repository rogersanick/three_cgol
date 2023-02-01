import { ThreeEvent } from '@react-three/fiber';
import React, { ReactNode, useState } from 'react';

// This is the interface for the context
interface GameEngineContextType {
  board: (number | null)[][];
  updateBoard: (clickEvent: ThreeEvent<MouseEvent>) => void;
}

// Instantiate the board game context
const GameEngineContext = React.createContext<GameEngineContextType>({
  board: [],
  updateBoard: (_: ThreeEvent<MouseEvent>) => {}
});

const GameEngine: React.FC<{ children: ReactNode, boardSize: number }> = ({ children, boardSize }) => {

  // Build the starting board
  const [board, setBoard] = useState<(number | null)[][]>(
    Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null))
  );

  // Create a function which updates the board
  function updateBoard(clickEvent: ThreeEvent<MouseEvent>) {

    // Get the cubes position from the click event
    const { x, z } = clickEvent.intersections[0].point;
    const adjustedX = Math.round(x);
    const adjustedZ = Math.round(z);
    const cubeXIndex = adjustedX + boardSize / 2;
    const cubeZIndex = adjustedZ + boardSize / 2;

    if (!board[cubeXIndex][cubeZIndex]) {
      // Update the cube positions
      const newBoard = duplicateArrayOfArrays(board);
      newBoard[cubeXIndex][cubeZIndex] = 1;
      setBoard(newBoard);
    }
  }

  return (
    <GameEngineContext.Provider value={{ board, updateBoard }}>
      {children}
    </GameEngineContext.Provider>
  );
};

function duplicateArrayOfArrays<T>(originalArray: T[][]): T[][] {
  return originalArray.map(arr => arr.map(elem => elem));
}

export { GameEngine, GameEngineContext };