import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Perf } from 'r3f-perf';
import GameBoard from "./GameBoard";
import { GameEngine } from "./GameEngineContext";

const Scene = () => {
  return (
    <>
      <Suspense>
        <Environment preset="city" />
        <Perf position="top-left"/>
        <GameEngine boardSize={50}>
          <GameBoard />
        </GameEngine>
      </Suspense>
      <ambientLight />
    </>
  );
};

export default Scene;