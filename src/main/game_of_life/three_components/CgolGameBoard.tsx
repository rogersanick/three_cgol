import { Grid, Plane, RoundedBox, PerformanceMonitor, OrbitControls } from "@react-three/drei";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Suspense, useContext, useEffect, useState } from "react";
import { Color, Intersection } from "three";
import AdaptivePixelRatio from "../../shared_three_components/AdaptivePixelRatio";
import { colors } from "../../color";
import { GameEngineContext } from "../game_engine/GameEngine";
import GelatinousCube from "../../shared_three_components/GelatinousCube";
import Lights from "../../shared_three_components/Lights";
import Slime from "../../shared_three_components/Slime";

const CgolGameBoard = () => {

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

  // Game configuration
  const [animationDuration] = useState(200)
  const camPosition: [number, number, number] = isDemo ? [15, 10, 15] : [50, 30, 50]

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
    <Suspense>
      <Canvas id="three-canvas" camera={{ fov:50, position: camPosition }}>
        <PerformanceMonitor>
          <AdaptivePixelRatio />
          <OrbitControls autoRotate={isDemo} autoRotateSpeed={1.5}/>
      
            {isDemo ? null : <RoundedBox name={"StepCube"} onClick={requestNextGameState} args={[1, 1, 1]} position={[0,5,0]}>
              <meshStandardMaterial color={"red"} />
            </RoundedBox> }
            { isDemo ? null : <RoundedBox name={"StepCube"} onClick={handleChangePlayer} args={[1, 1, 1]} position={[3,5,0]}>
              <meshStandardMaterial color={colors[currentPlayerNumber]} />
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
              <meshToonMaterial color="#1E313B"/>
            </Plane>
          <Lights />
        </PerformanceMonitor>
      </Canvas>
    </Suspense>
  );
};

export default CgolGameBoard;