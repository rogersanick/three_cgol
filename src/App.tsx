import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import Scene from "./Scene";
import AdaptivePixelRatio from "./AdaptivePixelRatio";

const App = () => {
  return (
    <Canvas camera={{ fov: 70, position: [50, 30, 50] }}>
      <PerformanceMonitor>
        <AdaptivePixelRatio />
        <OrbitControls />
        <Scene />
      </PerformanceMonitor>
    </Canvas>
  );
};

export default App;
