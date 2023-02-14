import { Grid, Plane, RoundedBox } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Suspense, useContext, useEffect, useState } from "react";
import { Color, Intersection } from "three";
import { colors } from "./color";
import { DemoGameEngineContext } from "./DemoGameEngineContext";
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

const GameBoard = (props: { isDemo: boolean }) => {
  const { isDemo} = props;

  // State of the board game from context
  const { gamePieces, applyCgol, addGelatinousCube } = useContext(isDemo ? DemoGameEngineContext : GameEngineContext);
  const { gelatinousCubes, slimePaths } = gamePieces;
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
    const adjustedX = Math.round(x);
    const adjustedZ = Math.round(z);
    const cubeXIndex = adjustedX + boardSize / 2;
    const cubeZIndex = adjustedZ + boardSize / 2;
    addGelatinousCube(cubeXIndex, cubeZIndex, currentPlayerNumber);
  }

  // Reusable three materials
  const [ cubeMaterials ] = useState(colors.map(color => <meshStandardMaterial color={color} />))
  const [ slimeMaterials ] = useState(colors.map(color => {
    const lightenedColor = new Color(color).lerp(new Color("white"), 0.2)
    return <meshStandardMaterial color={lightenedColor} />
  }));
  

  return (
    <>
      <Suspense>
        {isDemo ? null : <RoundedBox name={"StepCube"} onClick={applyCgol} args={[1, 1, 1]} position={[0,5,0]}>
          <meshStandardMaterial color={"red"} />
        </RoundedBox> }
        { isDemo ? null : <RoundedBox name={"StepCube"} onClick={handleChangePlayer} args={[1, 1, 1]} position={[3,5,0]}>
          <meshStandardMaterial color={color[currentPlayerNumber]} />
        </RoundedBox> }
        <Grid args={[boardSize, boardSize]} position={[-0.5, -0.45, -0.5]} cellSize={1} cellColor={"purple"}/>
        {
          slimePaths.map((row, rowIndex) => {
            return row.map((slimePlayerNumber, columnIndex) => {
              const cubePlayerNumber = gelatinousCubes[rowIndex][columnIndex];
              const cubeXIndex = rowIndex - boardSize / 2;
              const cubeZIndex = columnIndex - boardSize / 2;
              
              return <group key={`${cubeXIndex}${cubeZIndex}${slimePlayerNumber}`}>
                {cubePlayerNumber !== null ? <GelatinousCube material={cubeMaterials[cubePlayerNumber]} position={[cubeXIndex, 0.3, cubeZIndex]}/> : null }
                {slimePlayerNumber !== null ? <Slime material={slimeMaterials[slimePlayerNumber]} position={[cubeXIndex, -0.35, cubeZIndex]}/> : null }
              </group>
            })
          })
        }
        <Plane name={"GameBoard"} args={[boardSize, boardSize]} onClick={(e) => handleAddGelatinousCube(e)} rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, -0.5, -0.5]} receiveShadow />
      </Suspense>
    </>
  );
};

export default GameBoard;