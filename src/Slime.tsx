import { RoundedBox } from "@react-three/drei"
import React, { useState } from "react"
import { Color } from "three"
import { colors } from "./color"

const Slime = (props: { 
  position: [number, number, number], playerNumber: number
}) => {
  const [materialConfig] = useState({
    ior: 1.2,
    clearcoat: 0.2,
    transmission: 0.5,
    opacity: 1,
    transparent: true,
  })
  const [materials] = useState(colors.map(color => {
    const lightenedColor = new Color(color).lerp(new Color("white"), 0.2)
    return <meshPhysicalMaterial color={lightenedColor} {...materialConfig} />
  }))
  const { playerNumber, position } = props
  return (
    <group position={position}>
      <RoundedBox args={[1,0.2,1]}>
        {materials[playerNumber]}
      </RoundedBox>
    </group>
  )
}

export default React.memo(Slime)