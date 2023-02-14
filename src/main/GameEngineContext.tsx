import React, { ReactNode, useState } from 'react';

export interface GamePieces {
  gelatinousCubes: (number | null)[][];
  slimePaths: (number | null)[][];
}

// This is the interface for the context
export interface GameEngineContextType {
  gamePieces: GamePieces;
  addGelatinousCube: (x: number, y: number, playerNumber: number) => void;
  applyCgol: () => void;
}

// Instantiate the board game context
const GameEngineContext = React.createContext<GameEngineContextType>({
  gamePieces: {
    gelatinousCubes: [] as (number | null)[][],
    slimePaths: [] as (number | null)[][],
  },
  applyCgol: () => {},
  addGelatinousCube: (_: number, __: number, ___: number) => {},
});

const GameEngine: React.FC<{ children: ReactNode, boardSize: number }> = ({ children, boardSize }) => {

  // Build the representation of game pieces
  const [gamePieces, setGamePieces] = useState<GamePieces>({
    gelatinousCubes: Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null)) as (number | null)[][],
    slimePaths: Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null)) as (number | null)[][]
  });
  
  // Handle the progression of CGOl for Gelatinous Cubes
  const applyCgol = () => { 
    // const { gelatinousCubes, slimePaths } = gamePieces;
    // const newGelatinousCubes = cgolGelatinousCubeTransition(gelatinousCubes)
    // setGelatinousCubes(newGelatinousCubes) 
    // const newSlimePaths = slimePathTransition(newGelatinousCubes, slimePaths)
    // setSlimePaths(newSlimePaths)
  }
  
  // Create a function which updates the board
  function addGelatinousCube(x: number, z: number, playerNumber: number) {
    const { gelatinousCubes, slimePaths } = gamePieces;
    const adjustedX = Math.round(x);
    const adjustedZ = Math.round(z);
    const cubeXIndex = adjustedX + boardSize / 2;
    const cubeZIndex = adjustedZ + boardSize / 2;

    if (gelatinousCubes[cubeXIndex][cubeZIndex] === null) {
      // Update gelatinous cubes
      const newBoard = duplicateArrayOfArrays(gelatinousCubes);
      const newSlimePaths = duplicateArrayOfArrays(slimePaths);
      newBoard[cubeXIndex][cubeZIndex] = playerNumber;
      newSlimePaths[cubeXIndex][cubeZIndex] = playerNumber;
      setGamePieces({ gelatinousCubes: newBoard, slimePaths: newSlimePaths });
    }
  }

  return (
    <GameEngineContext.Provider value={{ gamePieces, applyCgol, addGelatinousCube }}>
      {children}
    </GameEngineContext.Provider>
  );
};

function duplicateArrayOfArrays<T>(originalArray: T[][]): T[][] {
  return originalArray.map(arr => arr.map(elem => elem));
}

export { GameEngine, GameEngineContext };