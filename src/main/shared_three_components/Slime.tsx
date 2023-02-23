import { Box } from "@react-three/drei"
import { memo } from "react"

const Slime = (props: { 
  xIndex: number, zIndex: number, material: JSX.Element
}) => {
  const { material, xIndex, zIndex } = props
  const position = [xIndex, -0.35, zIndex] as [number, number, number]
  return (
    <Box position={position} args={[1,0.2,1]}>
      {material}
    </Box>
  )
}

export default memo(Slime)