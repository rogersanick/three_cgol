import { Grid, Plane, RoundedBox } from "@react-three/drei";
import { Suspense, useContext, useEffect, useState } from "react";
import { GameEngineContext } from "./GameEngineContext";
import gameOfLifeTransition from "./GamePhases";
import GelatinousCube from "./GelatinousCube";

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
  const { board, setBoard, updateBoard } = useContext(GameEngineContext);
  const [ currentPlayerNumber, setCurrentPlayerNumber ] = useState(0);
  const boardSize = board.length;

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

  return (
    <>
      <Suspense>
        <RoundedBox name={"StepCube"} onClick={() => { setBoard(gameOfLifeTransition(board)) }} args={[1, 1, 1]} position={[0,5,0]}>
          <meshStandardMaterial color={"red"} />
        </RoundedBox>
        <RoundedBox name={"StepCube"} onClick={handleChangePlayer} args={[1, 1, 1]} position={[3,5,0]}>
          <meshStandardMaterial color={color[currentPlayerNumber]} />
        </RoundedBox>
        <Grid args={[boardSize, boardSize]} position={[-0.5, -0.45, -0.5]} cellSize={1} cellColor="white" />
        {
          board.map((row, rowIndex) => {
            return row.map((cubePlayerNumber, columnIndex) => {
              if (cubePlayerNumber !== null) {
                const cubeXIndex = rowIndex - boardSize / 2;
                const cubeZIndex = columnIndex - boardSize / 2;
                return  <GelatinousCube playerNumber={cubePlayerNumber} key={`X:${cubeXIndex}Z:${cubeZIndex}`} position={[cubeXIndex, -0.25, cubeZIndex]}/>
              } else {
                return null;
              }
            })
          })
        }
        <Plane name={"GameBoard"} args={[boardSize, boardSize]} onClick={(e) => updateBoard(e, currentPlayerNumber)} rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, -0.5, -0.5]} receiveShadow/>
      </Suspense>
    </>
  );
};

export default GameBoard;