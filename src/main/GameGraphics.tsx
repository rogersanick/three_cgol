import { OrbitControls, PerformanceMonitor, PresentationControls } from "@react-three/drei";
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
    <Canvas id="three-canvas" className="top-0" camera={{ fov:50, position: camPosition }}>
      <PerformanceMonitor>
        <AdaptivePixelRatio />
        {isDemo ? <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 100 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 6]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
            {/* <Environment preset="city" /> */}
            { monitorPerf ? <Perf position="top-left"/> : null }
            <GameBoard />
          </PresentationControls> : 
          <>
            <OrbitControls autoRotateSpeed={1.5}/>
            <GameBoard />
          </>}
          <Lights />
      </PerformanceMonitor>
    </Canvas>
  );
};

export default GameGraphics;