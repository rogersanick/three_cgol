import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import { Suspense, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from 'r3f-perf';
import GameBoard from "./GameBoard";
import AdaptivePixelRatio from "./AdaptivePixelRatio";
import Lights from "./Lights";
import { GameEngineContext } from "./gameEngine/GameEngineContext";

const GameGraphics = (props: { monitorPerf: boolean }) => {
  const { isDemo } = useContext(GameEngineContext)
  const { monitorPerf } = props;
  const camPosition: [number, number, number] = isDemo ? [15, 10, 15] : [50, 30, 50]
  return (
    <Canvas id="three-canvas" className="top-0" camera={{ fov: 70, position: camPosition }}>
      <PerformanceMonitor>
        <AdaptivePixelRatio />
        <OrbitControls autoRotate={isDemo} autoRotateSpeed={1.5}/>
        <Suspense>
          {/* <Environment preset="city" /> */}
          { monitorPerf ? <Perf position="top-left"/> : null }
          <GameBoard />
        </Suspense>
        <Lights />
      </PerformanceMonitor>
    </Canvas>
  );
};

export default GameGraphics;