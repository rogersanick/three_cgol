import { Grid, Plane, RoundedBox } from "@react-three/drei";
import { Suspense, useContext } from "react";
import { GameEngineContext } from "./GameEngineContext";
import gameOfLifeTransition from "./GamePhases";
import GelatinousCubePath from "./GelatinousCubePath";

const GameBoard = () => {
  const { board, setBoard, updateBoard } = useContext(GameEngineContext);
  const boardSize = board.length;

  return (
    <>
      <Suspense>
        <RoundedBox name={"StepCube"} onClick={() => { setBoard(gameOfLifeTransition(board)) }} args={[1, 1, 1]} position={[0,10,0]}>
          <meshStandardMaterial color={"red"} />
        </RoundedBox>
        <Grid args={[boardSize, boardSize]} position={[-0.5, -0.45, -0.5]} cellSize={1} cellColor="white" />
        {
          board.map((row, rowIndex) => {
            return row.map((cubeID, columnIndex) => {
              if (cubeID) {
                const cubeXIndex = rowIndex - boardSize / 2;
                const cubeZIndex = columnIndex - boardSize / 2;
                return  <GelatinousCubePath key={`X:${cubeXIndex}Z:${cubeZIndex}`} position={[cubeXIndex, -0.25, cubeZIndex]}/>
              } else {
                return null;
              }
            })
          })
        }
        <Plane name={"GameBoard"} args={[boardSize, boardSize]} onClick={(e) => updateBoard(e)} rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, -0.5, -0.5]} receiveShadow/>
      </Suspense>
    </>
  );
};

export default GameBoard;