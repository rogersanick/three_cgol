import React, { useEffect, useState } from "react"
import { animated, config, useSpring } from "@react-spring/three"
import { RoundedBoxGeometry } from "./RoundedBoxGeometry"

const GelatinousCube = (props: { 
  xIndex: number,
  zIndex: number,
  material: JSX.Element,
  animationDuration: number,
  shouldDie: boolean
}) => {
  
  const { xIndex, zIndex, material, shouldDie, animationDuration } = props
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

  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.mesh position={animatedPosition}>
      {material}
      <RoundedBoxGeometry args={[1, 1, 1]} />
    </animated.mesh>
  )
}

export default React.memo(GelatinousCube)