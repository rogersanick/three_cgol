import { RoundedBox } from "@react-three/drei"
import React from "react"

const GelatinousCubePath = (props: { 
  position: [number, number, number]
}) => {
  return (
    <group dispose={null} position={props.position}>
      <RoundedBox args={[1,1,1]}>
        <meshPhysicalMaterial color={"green"} />
      </RoundedBox>
    </group>
  )
}

export default React.memo(GelatinousCubePath)