import { RoundedBox } from "@react-three/drei"
import React from "react"
import { colors } from "./color"

const Slime = (props: { 
  position: [number, number, number], playerNumber: number
}) => {
  const { playerNumber, position } = props
  return (
    <group position={position}>
      <RoundedBox args={[1,0.2,1]}>
        <meshPhysicalMaterial color={colors[playerNumber]} />
      </RoundedBox>
    </group>
  )
}

export default React.memo(Slime)