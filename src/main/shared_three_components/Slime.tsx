import { useFrame } from "@react-three/fiber"
import { memo, useMemo, useRef, useState } from "react"
import { MeshLambertMaterial, BoxGeometry, Object3D, MeshStandardMaterial } from "three"
import { gameColors } from "../color"

const Slime = (props: { 
  xIndex: number, zIndex: number, playerIndex: number
}) => {
  const { playerIndex, xIndex, zIndex } = props
  const position = [xIndex, -0.35, zIndex] as [number, number, number]
  const [ slimeMaterials ] = useState(gameColors.map(color => useMemo(() => <meshStandardMaterial color={color.lightHex} />, [])))
  const boxGeometry = useMemo(() => <boxGeometry args={[1,0.2,1]}/>, [])
  return (
    <mesh position={position}>
      {slimeMaterials[playerIndex]}
      {boxGeometry}
    </mesh>
  )
}

interface BoxesProps {
  positions: number[][];
}

const InstanceSlime: React.FC<BoxesProps> = ({ positions }) => {

  // Materials and geometry
  const [ slimeMaterials ] = useState(gameColors.map(color => useMemo(() => new MeshStandardMaterial({color: color.lightHex}), [])))
  const boxGeometry = useMemo(() => new BoxGeometry(1,0.2,1), [])

  // Reference and temp object for instancing
  const ref = useRef<THREE.InstancedMesh>(null!);
  const tempBoxes = new Object3D();

  // Get slime count
  const slimeCount = positions.reduce((acc, row) => {
    return acc + row.filter((v) => v !== null).length;
  }, 0);

  useFrame(({ clock }) => {
    let counter = 0;
    const t = clock.oldTime * 0.001;
    for (let x = 0; x < positions.length; x++) {
      for (let z = 0; z < positions[0].length; z++) {
        const id = counter++;
        if (positions[x][z] !== null) {
          tempBoxes.position.set(x, -0.35, z);
          tempBoxes.rotation.y = t;
          tempBoxes.updateMatrix();
          ref.current.setMatrixAt(id, tempBoxes.matrix);
        }
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={ref} args={[boxGeometry, slimeMaterials[0], slimeCount]} />;
};

export { Slime, InstanceSlime } 