import { RoundedBox } from "@react-three/drei"
import React from "react"

const GelatinousCube = (props: { 
  position: [number, number, number]
  material: JSX.Element
}) => {
  const { position, material } = props
  return (
    <RoundedBox args={[1,1,1]} position={position}>
      {material}
    </RoundedBox>
  )
}

export default React.memo(GelatinousCube)