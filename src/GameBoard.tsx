import { Grid, Plane } from "@react-three/drei";
import { Suspense, useContext } from "react";
import { GameEngineContext } from "./GameEngineContext";
import GelatinousCube from "./GelatinousCube";

const GameBoard = () => {
  const { board, updateBoard } = useContext(GameEngineContext);
  const boardSize = board.length;
  return (
    <>
      <Suspense>
        <Grid args={[boardSize, boardSize]} position={[-0.5, -0.45, -0.5]} cellSize={1} cellColor="white" />
        {
          board.map((row, rowIndex) => {
            return row.map((cubeID, columnIndex) => {
              if (cubeID) {
                const cubeXIndex = rowIndex - boardSize / 2;
                const cubeZIndex = columnIndex - boardSize / 2;
                return  <GelatinousCube key={`X:${cubeXIndex}Z:${cubeZIndex}`} position={[cubeXIndex, 0, cubeZIndex]}/>
              } else {
                return null;
              }
            })
          })
        }
        <Plane args={[boardSize, boardSize]} onClick={(e) => updateBoard(e)} rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, -0.5, -0.5]} receiveShadow/>
      </Suspense>
    </>
  );
};

export default GameBoard;