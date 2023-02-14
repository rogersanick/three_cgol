import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { GameEngineContextType, GamePieces } from './GameEngineContext';

// Instantiate the board game context
const DemoGameEngineContext = React.createContext<GameEngineContextType>({
  gamePieces: {
    gelatinousCubes: [],
    slimePaths: []
  },
  addGelatinousCube: (_: number, __: number, ___: number) => {},
  applyCgol: () => {},
});

// Utility function to add organisms
const addNewOrganism = (gamePieces: GamePieces, boardSize: number) => {
  const { gelatinousCubes, slimePaths } = gamePieces;
  const newGelatinousCubes = duplicateArrayOfArrays(gelatinousCubes);
  const newSlimePaths = duplicateArrayOfArrays(slimePaths);
  // Determine if a new organism will spawn
  const newOrganismXCenter = Math.round(Math.random() * boardSize - 2) + 1
  const newOrgamismZCenter = Math.round(Math.random() * boardSize - 2) + 1
  const randomPlayerNumber = Math.round(Math.random() * 6)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gelatinousCubes[newOrganismXCenter + i] && gelatinousCubes[newOrganismXCenter + i][newOrgamismZCenter + j] === null) {
        if (Math.random() > 0.25) {
          newGelatinousCubes[newOrganismXCenter + i][newOrgamismZCenter + j] = randomPlayerNumber;
          newSlimePaths[newOrganismXCenter + i][newOrgamismZCenter + j] = randomPlayerNumber;
        }
      }
    }
  }
  return { gelatinousCubes: newGelatinousCubes, slimePaths: newSlimePaths };
}

const DemoGameEngine: React.FC<{ children: ReactNode, boardSize: number }> = ({ children, boardSize }) => {

  // Build the representation of game pieces
  const [gamePieces, setGamePieces] = useState<GamePieces>({
    gelatinousCubes: Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null)) as (number | null)[][],
    slimePaths: Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null)) as (number | null)[][]
  });

  const gameEngineWorkerRef = useRef(
    new Worker(new URL('./gameLogic/workers/gamePhaseWorker.ts', import.meta.url), { type: 'module' }));

  // Add random cubes
  useEffect(() => {
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
  })

  return (
    <DemoGameEngineContext.Provider value={{ gamePieces, addGelatinousCube: () => {}, applyCgol: () => {} }}>
      {children}
    </DemoGameEngineContext.Provider>
  );
};

function duplicateArrayOfArrays<T>(originalArray: T[][]): T[][] {
  return originalArray.map(arr => arr.map(elem => elem));
}

export { DemoGameEngine, DemoGameEngineContext };