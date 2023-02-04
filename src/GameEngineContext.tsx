import { ThreeEvent } from '@react-three/fiber';
import React, { ReactNode, useState } from 'react';
import { Intersection } from 'three';

// This is the interface for the context
interface GameEngineContextType {
  gelatinousCubes: (number | null)[][];
  setGelatinousCubes: (newBoard: (number | null)[][]) => void;
  addGelatinousCube: (x: number, y: number, playerNumber: number) => void;
}

// Instantiate the board game context
const GameEngineContext = React.createContext<GameEngineContextType>({
  gelatinousCubes: [],
  setGelatinousCubes: (_: (number | null)[][]) => {},
  addGelatinousCube: (_: number, __: number, ___: number) => {}
});

const GameEngine: React.FC<{ children: ReactNode, boardSize: number }> = ({ children, boardSize }) => {

  // Build the starting board
  const [gelatinousCubes, setGelatinousCubes] = useState<(number | null)[][]>(
    Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null))
  );

  // Create a function which updates the board
  function addGelatinousCube(x: number, z: number, playerNumber: number) {

    // // Don't update if clicking step cube
    // if (clickEvent.intersections.some((intersection: Intersection) => intersection.object.name === "StepCube")) {
    //   return;
    // }

    // // Get the cubes position from the click event
    // const { x, z } = clickEvent.intersections[0].point;
    const adjustedX = Math.round(x);
    const adjustedZ = Math.round(z);
    const cubeXIndex = adjustedX + boardSize / 2;
    const cubeZIndex = adjustedZ + boardSize / 2;

    if (gelatinousCubes[cubeXIndex][cubeZIndex] === null) {
      // Update the cube positions
      const newBoard = duplicateArrayOfArrays(gelatinousCubes);
      newBoard[cubeXIndex][cubeZIndex] = playerNumber;
      setGelatinousCubes(newBoard);
    }
  }

  return (
    <GameEngineContext.Provider value={{ gelatinousCubes: gelatinousCubes, setGelatinousCubes, addGelatinousCube }}>
      {children}
    </GameEngineContext.Provider>
  );
};

function duplicateArrayOfArrays<T>(originalArray: T[][]): T[][] {
  return originalArray.map(arr => arr.map(elem => elem));
}

export { GameEngine, GameEngineContext };