import React from "react"
import { animated, config, useSpring } from "@react-spring/three"
import { RoundedBoxGeometry } from "./RoundedBoxGeometry"

const GelatinousCube = (props: { 
  position: [number, number, number]
  material: JSX.Element
  aboveBoard: boolean
}) => {
  
  const { position, material, aboveBoard } = props
  const adjPosition = [...position]
  adjPosition[1] -= 1.5

  const { animatedPosition } = useSpring({
    animatedPosition: position,
    config: {
      ...config.wobbly,
      duration: 200
    }
  });

  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.mesh position={animatedPosition}>
      {material}
      <RoundedBoxGeometry args={[1, 1, 1]} />
    </animated.mesh>
  )
}

export default React.memo(GelatinousCube)