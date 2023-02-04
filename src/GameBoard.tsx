import { Grid, Plane, RoundedBox } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Suspense, useContext, useEffect, useState } from "react";
import { Intersection } from "three";
import { GameEngineContext } from "./GameEngineContext";
import GelatinousCube from "./GelatinousCube";
import Slime from "./Slime";

const color = [
  "#FFB347",
  "#77DD77",
  "#FDFD96",
  "#B19CD9",
  "#FF6961",
  "#87CEEB",
  "#7EC0EE",
  "#F49AC2"
]

const GameBoard = () => {

  // State of the board game from context
  const { gelatinousCubes, slimePaths, applyCgol, addGelatinousCube } = useContext(GameEngineContext);
  const [ currentPlayerNumber, setCurrentPlayerNumber ] = useState(0);
  const boardSize = gelatinousCubes.length;

  // Handle the player input
  const handleChangePlayerKeyBoardInput = (e: KeyboardEvent) => { if (e.key === "Shift") { 
    setCurrentPlayerNumber((currentPlayerNumber + 1) % 8) 
  }};

  const handleChangePlayer = () => {
    setCurrentPlayerNumber((currentPlayerNumber + 1) % 8)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleChangePlayerKeyBoardInput)
    return () => {
      document.removeEventListener('keydown', handleChangePlayerKeyBoardInput)
    }
  }, [currentPlayerNumber])

  // Handle adding a cube
  const handleAddGelatinousCube = (clickEvent: ThreeEvent<MouseEvent>) => {
    // Don't update if clicking step cube
    if (clickEvent.intersections.some((intersection: Intersection) => intersection.object.name === "StepCube")) {
      return;
    }

    // Get the cubes position from the click event
    const { x, z } = clickEvent.intersections[0].point;
    addGelatinousCube(x, z, currentPlayerNumber);
  }

  return (
    <>
      <Suspense>
        <RoundedBox name={"StepCube"} onClick={applyCgol} args={[1, 1, 1]} position={[0,5,0]}>
          <meshStandardMaterial color={"red"} />
        </RoundedBox>
        <RoundedBox name={"StepCube"} onClick={handleChangePlayer} args={[1, 1, 1]} position={[3,5,0]}>
          <meshStandardMaterial color={color[currentPlayerNumber]} />
        </RoundedBox>
        <Grid args={[boardSize, boardSize]} position={[-0.5, -0.45, -0.5]} cellSize={1} cellColor="white" />
        {
          gelatinousCubes.map((row, rowIndex) => {
            return row.map((cubePlayerNumber, columnIndex) => {
              const slimePlayerNumber = slimePaths[rowIndex][columnIndex];
              const cubeXIndex = rowIndex - boardSize / 2;
              const cubeZIndex = columnIndex - boardSize / 2;
              return <group key={`Cube Slime:${cubeXIndex}Z:${cubeZIndex}`}>
                {cubePlayerNumber ? <GelatinousCube playerNumber={cubePlayerNumber} key={`Cube X:${cubeXIndex}Z:${cubeZIndex}`} position={[cubeXIndex, 0.3, cubeZIndex]}/> : null }
                {slimePlayerNumber ? <Slime playerNumber={slimePlayerNumber} key={`Slime X:${cubeXIndex}Z:${cubeZIndex}`} position={[cubeXIndex, -0.35, cubeZIndex]}/> : null }
              </group>
            })
          })
        }
        <Plane name={"GameBoard"} args={[boardSize, boardSize]} onClick={(e) => handleAddGelatinousCube(e)} rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, -0.5, -0.5]} receiveShadow/>
      </Suspense>
    </>
  );
};

export default GameBoard;