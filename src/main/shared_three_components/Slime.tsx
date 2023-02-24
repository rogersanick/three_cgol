import { memo, useMemo, useState } from "react"
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

export default memo(Slime)