import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { addNewOrganism } from '../gameLogic/addNewOrganism';
import { duplicateArrayOfArrays } from '../utils';

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
  transitioning: boolean;
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
  transitioning: false,
});

const GameEngine: React.FC<{ children: ReactNode, boardSize: number, isDemo: boolean }> = ({ children, boardSize, isDemo }) => {

  // Build the representation of game pieces
  const [gamePieces, setGamePieces] = useState<GamePieces>({
    gelatinousCubes: Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null)) as (number | null)[][],
    slimePaths: Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null)) as (number | null)[][]
  });
  const [nextGamePieces, setNextGamePieces] = useState<GamePieces | null>()

  // Create a flag to indiciate the gameState is transitioning
  const [transitioning, setTransitioning] = useState(false);

  // Create a worker to handle the game logic
  const gameEngineWorkerRef = useRef(
    new Worker(new URL('../gameLogic/workers/gamePhaseWorker.ts', import.meta.url), { type: 'module' }));
  
  // Add random cubes
  useEffect(() => {

    let continueDemoInterval: NodeJS.Timer;
    let fillGameStateQueueInterval: NodeJS.Timer;

    // Demo logic
    if (isDemo) {

      // Filling the game state queue
      const fillGameStateQueue = async () => {
        // Get the game pieces from state
        const { gelatinousCubes, slimePaths } = gamePieces;
      
        // Ask for a new game state if we're not already updating
        if (!nextGamePieces) {
          gameEngineWorkerRef.current.postMessage({
            gelatinousCubes,
            slimePaths
          });
        }
  
        gameEngineWorkerRef.current.onmessage = (event) => {
          // Maybe add an organism
          let { gelatinousCubes, slimePaths } = event.data
          if (Math.random() > 0.6) {
            ({ gelatinousCubes, slimePaths } = addNewOrganism({ gelatinousCubes, slimePaths }, boardSize))
          }

          setNextGamePieces({ gelatinousCubes, slimePaths })
        }
      }
      fillGameStateQueueInterval = setInterval(fillGameStateQueue, 200)

      // Continue the demo
      const continueDemo = () => {
        if (!nextGamePieces) {
          console.log("No next game state available")
        } else {

          // Set the transitioning flag
          setTransitioning(true)

          // Apply the next game pieces
          setGamePieces(nextGamePieces)
          setNextGamePieces(null)

          setTimeout(() => {
            setTransitioning(false)
          }, 900)
        }
      }
      continueDemoInterval = setInterval(continueDemo, 1000)
    } else {
      gameEngineWorkerRef.current.onmessage = (event) => {
        let { gelatinousCubes, slimePaths } = event.data
        setGamePieces({ gelatinousCubes, slimePaths })
      }
    }
    return () => { 
      fillGameStateQueueInterval && clearInterval(fillGameStateQueueInterval)
      continueDemoInterval && clearInterval(continueDemoInterval) 
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
      isDemo, gamePieces, transitioning,
      applyCgol: isDemo ? () => {} : applyCgol , 
      addGelatinousCube: isDemo ? () => {} : addGelatinousCube  }}>
      {children}
    </GameEngineContext.Provider>
  );
};

export { GameEngine, GameEngineContext };