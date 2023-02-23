import { Box } from "@react-three/drei"
import { memo, useMemo, useState } from "react"
import { gameColors } from "../color"

const Slime = (props: { 
  xIndex: number, zIndex: number, playerIndex: number
}) => {
  const { playerIndex, xIndex, zIndex } = props
  const position = [xIndex, -0.35, zIndex] as [number, number, number]
  const [ slimeMaterials ] = useState(gameColors.map(color => useMemo(() => <meshStandardMaterial color={color.lightHex} />, [])))
  return (
    <Box position={position} args={[1,0.2,1]}>
      {slimeMaterials[playerIndex]}
    </Box>
  )
}

export default memo(Slime)