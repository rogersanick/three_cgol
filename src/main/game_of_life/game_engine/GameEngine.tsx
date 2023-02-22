import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { duplicateArrayOfArrays } from '../../utils';
import { addNewOrganism } from './addNewOrganism';

export interface GamePieces {
  gelatinousCubes: (number | null)[][];
  slimePaths: (number | null)[][];
}

// This is the interface for the context
export interface GameEngineContextType {
  gameState: GamePieces[];
  gameStateIndex: number;
  isDemo: boolean;
  isPlaying: boolean;
  isDrawing: boolean;
  currentOrganismIndex: number;
  setIsDrawing: (isDrawing: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentOrganismIndex: (index: number) => void;
  addGelatinousCube: (x: number, y: number, playerNumber: number) => void;
  advanceGameState: () => void;
  requestNextGameState: () => void;
}

// Instantiate the board game context
const GameEngineContext = React.createContext<GameEngineContextType>({
  gameState: [{
    gelatinousCubes: [] as (number | null)[][],
    slimePaths: [] as (number | null)[][],
  }],
  gameStateIndex: 0,
  isDemo: false,
  isPlaying: false,
  isDrawing: false,
  currentOrganismIndex: 0,
  setIsDrawing: () => {}, 
  setIsPlaying: () => {},
  setCurrentOrganismIndex: () => {},
  addGelatinousCube: (_: number, __: number, ___: number) => {},
  advanceGameState: () => {},
  requestNextGameState: () => {},
});

const GameEngine: React.FC<{ children: ReactNode, boardSize: number, isDemo: boolean }> = ({ children, boardSize, isDemo }) => {

  // Build the representation of game pieces
  const [gameState, setGameState] = useState<GamePieces[]>([{
    gelatinousCubes: Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null)) as (number | null)[][],
    slimePaths: Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null)) as (number | null)[][]
  }]);
  const [gameStateIndex, setGameStateIndex] = useState(0);
  const [currentOrganismIndex, setCurrentOrganismIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Create a worker to handle the game logic
  const gameEngineWorkerRef = useRef(
    new Worker(new URL('./workers/gamePhaseWorker.ts', import.meta.url), { type: 'module' }));
  
  useEffect(() => {
    if (isDemo) {
      setIsPlaying(true)
    }
  }, [isDemo])

  // Add random cubes
  useEffect(() => {
    // Handle responses from the game logic worker
    gameEngineWorkerRef.current.onmessage = (event) => {
      // Maybe add an organism
      let { gelatinousCubes, slimePaths } = event.data
      if (isDemo && Math.random() > 0.6) {
        ({ gelatinousCubes, slimePaths } = addNewOrganism({ gelatinousCubes, slimePaths }, boardSize))
      }

      setGameState([...gameState, { gelatinousCubes, slimePaths }])
    }
  })

  // Calculate the next game state
  const requestNextGameState = async () => {
    // Get the game pieces from state
    const { gelatinousCubes, slimePaths } = gameState[gameStateIndex];
  
    // Ask for a new game state if we're not already updating
    if (gameStateIndex === gameState.length - 1) {
      gameEngineWorkerRef.current.postMessage({
        gelatinousCubes,
        slimePaths
      });
    }
  }

  // Increment the game state index if a new game state is available
  const advanceGameState = () => {
    if (gameStateIndex === gameState.length - 1) {
      console.log("No next game state available")
    } else {
      // Apply the next game pieces
      setGameStateIndex(gameStateIndex + 1)
    }
  }
  
  // Create a function which updates the board
  function addGelatinousCube(x: number, z: number, playerNumber: number) {
    const { gelatinousCubes, slimePaths } = gameState[gameStateIndex];
    const cubeXIndex = x;
    const cubeZIndex = z;
    if (gelatinousCubes[cubeXIndex][cubeZIndex] === null) {
      // Update gelatinous cubes
      const newBoard = duplicateArrayOfArrays(gelatinousCubes);
      const newSlimePaths = duplicateArrayOfArrays(slimePaths);
      newBoard[cubeXIndex][cubeZIndex] = playerNumber;
      newSlimePaths[cubeXIndex][cubeZIndex] = playerNumber;
      // all but the last element of game state
      setGameState([...gameState.slice(0, -1), { gelatinousCubes: newBoard, slimePaths: newSlimePaths }]);
    }
  }

  return (
    <GameEngineContext.Provider value={{ 
      isDemo, gameState, gameStateIndex,
      currentOrganismIndex, isDrawing, isPlaying,
      setIsDrawing,
      setIsPlaying,
      setCurrentOrganismIndex,
      requestNextGameState,
      advanceGameState,
      addGelatinousCube: isDemo ? () => {} : addGelatinousCube  }}>
      {children}
    </GameEngineContext.Provider>
  );
};

export { GameEngine, GameEngineContext };