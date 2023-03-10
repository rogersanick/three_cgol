import { memo, useEffect, useMemo, useRef, useState } from "react"
import { animated, config, useSpring } from "@react-spring/three"
import { RoundedBoxGeometry } from "./RoundedBoxGeometry"
import { gameColors } from "../color"
import { MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { lerp } from "three/src/math/MathUtils"

const GelatinousCube = (props: { 
  xIndex: number,
  zIndex: number,
  playerIndex: number,
  animationDuration: number,
  shouldDie: boolean,
  cubeType?: "standard" | "wobble" | "distort",
}) => {
  
  const { xIndex, zIndex, playerIndex, shouldDie, animationDuration, cubeType = "standard" } = props
  const alivePosition = [xIndex, 0.3, zIndex]
  const deadPosition = [xIndex, -1.5, zIndex]

  // All cubes start dead, having not yet been born
  const [ isAlive, setIsAlive ] = useState(false)
  const [ hasBeenBorn, setHasBeenBorn ] = useState(false)

  // Get the animat position from whether or not the cube is alive
  const { animatedPosition } = useSpring({
    animatedPosition: isAlive ? alivePosition : deadPosition,
    config: {
      ...config.wobbly,
      duration: animationDuration
    }
  });

  useEffect(() => {
    // If the props indicate the cube should die, kill it
    if (shouldDie) {
      setIsAlive(false)
    }

    // If the cube has not been born, and the props indicate it should be alive, then birth it
    if (!hasBeenBorn && !shouldDie) {
      setIsAlive(true)
      setHasBeenBorn(true)
    }
  })

  const ref = useRef({ distort: 0 })
  useFrame(() => {
    ref.current.distort = lerp(ref.current.distort, 0.3, 0.3)
  })

  const [ cubeDistortMaterials ] = useState(gameColors.map(color => useMemo(() => <MeshDistortMaterial ref={ref} speed={5} color={color.mainHex} />, [])))
  const [ cubeWobbleMaterials ] = useState(gameColors.map(color => useMemo(() => <MeshWobbleMaterial speed={5} factor={0.2} color={color.mainHex} />, [])))
  const [ cubeStandardMaterials ] = useState(gameColors.map(color => useMemo(() => <meshStandardMaterial color={color.mainHex} />, [])))

  const getMaterial = () => {
    switch(cubeType) {
      case "wobble": return cubeWobbleMaterials[playerIndex]
      case "distort": return cubeDistortMaterials[playerIndex]  
      default: return cubeStandardMaterials[playerIndex]
    }
  }

  const geometry = useMemo(() => <RoundedBoxGeometry args={[1, 1, 1]} />, [])

  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.mesh position={animatedPosition}>
      { getMaterial() }
      { geometry }
    </animated.mesh>
  )
}

export default memo(GelatinousCube)