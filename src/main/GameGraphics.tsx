import { Environment, OrbitControls, PerformanceMonitor } from "@react-three/drei";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from 'r3f-perf';
import GameBoard from "./GameBoard";
import AdaptivePixelRatio from "./AdaptivePixelRatio";

const GameGraphics = () => {
  return (
    <Canvas id="three-canvas" className="top-0" camera={{ fov: 70, position: [50, 30, 50] }}>
      <PerformanceMonitor>
        <AdaptivePixelRatio />
        <OrbitControls />
        <Suspense>
          <Environment preset="city" />
          <Perf position="top-left"/>
          <GameBoard />
        </Suspense>
        <ambientLight />
      </PerformanceMonitor>
    </Canvas>
  );
};

export default GameGraphics;