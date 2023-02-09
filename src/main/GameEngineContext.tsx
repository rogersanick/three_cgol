import React, { ReactNode, useState } from 'react';
import { cgolGelatinousCubeTransition, slimePathTransition } from './GamePhases';

// This is the interface for the context
interface GameEngineContextType {
  gelatinousCubes: (number | null)[][];
  addGelatinousCube: (x: number, y: number, playerNumber: number) => void;
  slimePaths: (number | null)[][];
  applyCgol: () => void;
}

// Instantiate the board game context
const GameEngineContext = React.createContext<GameEngineContextType>({
  gelatinousCubes: [],
  applyCgol: () => {},
  addGelatinousCube: (_: number, __: number, ___: number) => {},
  slimePaths: [],
});

const GameEngine: React.FC<{ children: ReactNode, boardSize: number }> = ({ children, boardSize }) => {

  // Build the representation of gelatinousCubes
  const [gelatinousCubes, setGelatinousCubes] = useState<(number | null)[][]>(
    Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null))
  );

  // Build the representation of slimePaths
  const [slimePaths, setSlimePaths] = useState<(number | null)[][]>(
    Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null))
  );

  // Handle the progression of CGOl for Gelatinous Cubes
  const applyCgol = () => { 
    const newGelatinousCubes = cgolGelatinousCubeTransition(gelatinousCubes)
    setGelatinousCubes(newGelatinousCubes) 
    const newSlimePaths = slimePathTransition(newGelatinousCubes, slimePaths)
    setSlimePaths(newSlimePaths)
  }
  
  // Create a function which updates the board
  function addGelatinousCube(x: number, z: number, playerNumber: number) {
    const adjustedX = Math.round(x);
    const adjustedZ = Math.round(z);
    const cubeXIndex = adjustedX + boardSize / 2;
    const cubeZIndex = adjustedZ + boardSize / 2;

    if (gelatinousCubes[cubeXIndex][cubeZIndex] === null) {
      // Update gelatinous cubes
      const newBoard = duplicateArrayOfArrays(gelatinousCubes);
      newBoard[cubeXIndex][cubeZIndex] = playerNumber;
      setGelatinousCubes(newBoard);
      
      // Update slime paths
      const newSlimePaths = duplicateArrayOfArrays(slimePaths);
      newSlimePaths[cubeXIndex][cubeZIndex] = playerNumber;
      setSlimePaths(newSlimePaths);
    }
  }

  return (
    <GameEngineContext.Provider value={{ gelatinousCubes, applyCgol, addGelatinousCube, slimePaths }}>
      {children}
    </GameEngineContext.Provider>
  );
};

function duplicateArrayOfArrays<T>(originalArray: T[][]): T[][] {
  return originalArray.map(arr => arr.map(elem => elem));
}

export { GameEngine, GameEngineContext };