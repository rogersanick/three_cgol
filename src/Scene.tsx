import { Environment, Grid, Plane } from "@react-three/drei";
import { Suspense } from "react";
import { Perf } from 'r3f-perf';
import GameBoard from "./GameBoard";
import { button, useControls } from "leva";
import { GameEngine } from "./GameEngineContext";

const Scene = () => {
  useControls({
    step: button(() => console.log("step"))
  })
  return (
    <>
      <Suspense>
        <Environment preset="forest" />
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