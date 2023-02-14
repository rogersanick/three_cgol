import { Box } from "@react-three/drei"
import React from "react"

const Slime = (props: { 
  position: [number, number, number], material: JSX.Element
}) => {
  const { material, position } = props
  return (
    <Box position={position} args={[1,0.2,1]}>
      {material}
    </Box>
  )
}

export default React.memo(Slime)