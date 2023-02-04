import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import Scene from "./Scene";

const App = () => {
  return (
    <Canvas camera={{ fov: 70, position: [50, 30, 50] }}>
      <PerformanceMonitor>
        <OrbitControls />
        <Scene />
      </PerformanceMonitor>
    </Canvas>
  );
};

export default App;
