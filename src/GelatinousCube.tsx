import { RoundedBox } from "@react-three/drei"
import { useControls } from 'leva'
import React from "react"

const color = [
  "#FFB347",
  "#77DD77",
  "#FDFD96",
  "#B19CD9",
  "#FF6961",
  "#87CEEB",
  "#7EC0EE",
  "#F49AC2"
]

const GelatinousCube = (props: { 
  playerNumber: number,
  position: [number, number, number]
}) => {
  const { playerNumber, position } = props
  const config = useControls({
    scale: { value: 1, min: 0, max: 5, step: 0.01 },
    transparent: false,
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 2048, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    ior: { value: 2, min: 1, max: 5, step: 0.01 },
  })
  return (
    <group dispose={null} position={position} scale={config.scale}>
      <RoundedBox args={[1,0.5,1]}>
        <meshPhysicalMaterial color={color[playerNumber]} {...config} />
      </RoundedBox>
    </group>
  )
}

export default React.memo(GelatinousCube)