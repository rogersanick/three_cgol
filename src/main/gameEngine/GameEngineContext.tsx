import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { addNewOrganism } from '../gameLogic/addNewOrganism';

export interface GamePieces {
  gelatinousCubes: (number | null)[][];
  slimePaths: (number | null)[][];
}

// This is the interface for the context
export interface GameEngineContextType {
  gamePieces: GamePieces;
  isDemo: boolean;
  addGelatinousCube: (x: number, y: number, playerNumber: number) => void;
  applyCgol: () => void;
}

// Instantiate the board game context
const GameEngineContext = React.createContext<GameEngineContextType>({
  gamePieces: {
    gelatinousCubes: [] as (number | null)[][],
    slimePaths: [] as (number | null)[][],
  },
  isDemo: false,
  applyCgol: () => {},
  addGelatinousCube: (_: number, __: number, ___: number) => {},
});

const GameEngine: React.FC<{ children: ReactNode, boardSize: number, isDemo: boolean }> = ({ children, boardSize, isDemo }) => {

  // Build the representation of game pieces
  const [gamePieces, setGamePieces] = useState<GamePieces>({
    gelatinousCubes: Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null)) as (number | null)[][],
    slimePaths: Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null)) as (number | null)[][]
  });

  // Create a worker to handle the game logic
  const gameEngineWorkerRef = useRef(
    new Worker(new URL('../gameLogic/workers/gamePhaseWorker.ts', import.meta.url), { type: 'module' }));
  
  // Add random cubes
  useEffect(() => {
    // Demo logic
    if (isDemo) {
      const continueDemo = async () => {
        // Get the game pieces from state
        const { gelatinousCubes, slimePaths } = gamePieces;
      
        // Send game state to be processed by the game engine
        gameEngineWorkerRef.current.postMessage({
          gelatinousCubes,
          slimePaths
        });
  
        gameEngineWorkerRef.current.onmessage = (event) => {
          let { gelatinousCubes, slimePaths } = event.data
          if (Math.random() > 0.6) {
            ({ gelatinousCubes, slimePaths } = addNewOrganism({ gelatinousCubes, slimePaths }, boardSize))
          }
          setGamePieces({ gelatinousCubes, slimePaths })
        }
      }
  
      const interval = setInterval(continueDemo, 800)
      return () => { clearInterval(interval) }
    } else {
      gameEngineWorkerRef.current.onmessage = (event) => {
        let { gelatinousCubes, slimePaths } = event.data
        setGamePieces({ gelatinousCubes, slimePaths })
      }
    }
  })

  // Handle the progression of CGOl for Gelatinous Cubes
  const applyCgol = () => { 
    const { gelatinousCubes, slimePaths } = gamePieces;
    gameEngineWorkerRef.current.postMessage({
      gelatinousCubes,
      slimePaths
    });
  }
  
  // Create a function which updates the board
  function addGelatinousCube(x: number, z: number, playerNumber: number) {
    const { gelatinousCubes, slimePaths } = gamePieces;
    const cubeXIndex = x;
    const cubeZIndex = z;
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
    <GameEngineContext.Provider value={{ 
      isDemo, gamePieces, 
      applyCgol: isDemo ? () => {} : applyCgol , 
      addGelatinousCube: isDemo ? () => {} : addGelatinousCube  }}>
      {children}
    </GameEngineContext.Provider>
  );
};

function duplicateArrayOfArrays<T>(originalArray: T[][]): T[][] {
  return originalArray.map(arr => arr.map(elem => elem));
}

export { GameEngine, GameEngineContext };