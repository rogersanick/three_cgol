import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./Scene";

const App = () => {
  return (
    <Canvas camera={{ fov: 70, position: [150, 10, 150] }}>
      <OrbitControls />
      <Scene />
    </Canvas>
  );
};

export default App;
