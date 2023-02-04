import { RoundedBox } from "@react-three/drei"
import React, { useState } from "react"
import { colors } from "./color"

const GelatinousCube = (props: { 
  playerNumber: number,
  position: [number, number, number]
}) => {
  const [materialConfig] = useState({
    ior: 1.2,
    clearcoat: 0.2,
    transmission: 1,
    opacity: 0.7,
    transparent: true,
  })
  const [materials] = useState(colors.map(color => <meshPhysicalMaterial color={color} {...materialConfig} />))
  const { playerNumber, position } = props
  return (
    <group position={position}>
      <RoundedBox args={[1,1,1]}>
        {materials[playerNumber]}
      </RoundedBox>
    </group>
  )
}

export default React.memo(GelatinousCube)