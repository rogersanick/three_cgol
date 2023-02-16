import { OrbitControls, PerformanceMonitor, PresentationControls } from "@react-three/drei";
import { Suspense, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from 'r3f-perf';
import GameBoard from "./GameBoard";
import Lights from "./Lights";
import { GameEngineContext } from "../game_engine/GameEngineContext";
import AdaptivePixelRatio from "../AdaptivePixelRatio";

const GameGraphics = (props: { monitorPerf: boolean }) => {
  const { isDemo } = useContext(GameEngineContext)
  const camPosition: [number, number, number] = isDemo ? [15, 10, 15] : [50, 30, 50]
  return (
    <Canvas id="three-canvas" className="top-0" camera={{ fov:50, position: camPosition }}>
      <PerformanceMonitor>
        <AdaptivePixelRatio />
        <OrbitControls autoRotate={isDemo} autoRotateSpeed={1.5}/>
        <GameBoard />
        <Lights />
      </PerformanceMonitor>
    </Canvas>
  );
};

export default GameGraphics;