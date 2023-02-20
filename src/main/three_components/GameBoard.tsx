import { Grid, Plane, RoundedBox } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Suspense, useContext, useEffect, useState } from "react";
import { Color, Intersection } from "three";
import { colors } from "../constants/color";
import { GameEngineContext } from "../game_engine/GameEngineContext";
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
  const { 
    isDemo, 
    gameState, 
    gameStateIndex, 
    advanceGameState, 
    addGelatinousCube,
    requestNextGameState,
  } = useContext(GameEngineContext);
  const { gelatinousCubes, slimePaths } = gameState[gameStateIndex];

  // State of current player
  // TODO: Life this into context
  const [ currentPlayerNumber, setCurrentPlayerNumber ] = useState(0);
  const [animationDuration] = useState(200)

  // Reusable three materials
  const [ cubeMaterials ] = useState(colors.map(color => <meshStandardMaterial color={color} />))
  const [ slimeMaterials ] = useState(colors.map(color => {
    const lightenedColor = new Color(color).lerp(new Color("white"), 0.2)
    return <meshStandardMaterial color={lightenedColor} />
  }));

  // Get the board size
  const boardSize = gelatinousCubes.length;

  // Handle the player input
  const handleChangePlayerKeyBoardInput = (e: KeyboardEvent) => { if (e.key === "Shift") { 
    setCurrentPlayerNumber((currentPlayerNumber + 1) % 8) 
  }};

  const handleChangePlayer = () => {
    setCurrentPlayerNumber((currentPlayerNumber + 1) % 8)
  }

  useEffect(() => {
    let requestNextGameStateInterval: NodeJS.Timer;
    
    // Demo logic
    if (isDemo) {
      requestNextGameStateInterval = setInterval(requestNextGameState, 500)
    } 

    if (gameStateIndex === gameState.length - 2) {
      setTimeout(advanceGameState, animationDuration)
    }

    return () => { 
      requestNextGameStateInterval && clearInterval(requestNextGameStateInterval)
    }
  }, [gameState, gameStateIndex])

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
  
  return (
    <>
      <Suspense>
        {isDemo ? null : <RoundedBox name={"StepCube"} onClick={requestNextGameState} args={[1, 1, 1]} position={[0,5,0]}>
          <meshStandardMaterial color={"red"} />
        </RoundedBox> }
        { isDemo ? null : <RoundedBox name={"StepCube"} onClick={handleChangePlayer} args={[1, 1, 1]} position={[3,5,0]}>
          <meshStandardMaterial color={color[currentPlayerNumber]} />
        </RoundedBox> }
        <Grid args={[gelatinousCubes.length, gelatinousCubes.length]} position={[-0.5, -0.45, -0.5]} cellSize={1} cellColor={"purple"} cellThickness={0.1} sectionColor={[0.5, 0.5, 10] as any}/>
        {
          slimePaths.map((row, rowIndex) => {
            return row.map((slimePlayerNumber, columnIndex) => {
              const cubePlayerNumber = gelatinousCubes[rowIndex][columnIndex];

              let triggerDeathAnimation = false;
              if (gameState[gameStateIndex + 1]) {
                const { gelatinousCubes: nextGelatinousCubes } = gameState[gameStateIndex + 1];
                const nextPlayerNumer = nextGelatinousCubes[rowIndex][columnIndex];
                triggerDeathAnimation = cubePlayerNumber !== null && nextPlayerNumer === null;
              }

              const xIndex = rowIndex - boardSize / 2;
              const zIndex = columnIndex - boardSize / 2;
              
              return <group key={`${xIndex}${zIndex}${slimePlayerNumber}`}>
                {cubePlayerNumber !== null ? <GelatinousCube xIndex={xIndex} zIndex={zIndex} shouldDie={triggerDeathAnimation} animationDuration={animationDuration} material={cubeMaterials[cubePlayerNumber]}/> : null }
                {slimePlayerNumber !== null ? <Slime xIndex={xIndex} zIndex={zIndex} material={slimeMaterials[slimePlayerNumber]}/> : null }
              </group>
            })
          })
        }
        <Plane name={"GameBoard"} args={[boardSize, boardSize]} onClick={(e) => handleAddGelatinousCube(e)} rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, -0.5, -0.5]} receiveShadow>
          <meshToonMaterial color={"grey"} />
        </Plane>
      </Suspense>
    </>
  );
};

export default GameBoard;