import React, { useEffect } from "react"
import { animated, config, useSpring } from "@react-spring/three"
import { RoundedBoxGeometry } from "./RoundedBoxGeometry"

const GelatinousCube = (props: { 
  position: [number, number, number]
  material: JSX.Element
}) => {
  
  const { position, material } = props
  const adjPosition = [...position]
  adjPosition[1] -= 1.5

  const [active, setActive] = React.useState(false)
  const { animatedPosition } = useSpring({
    animatedPosition: active ? adjPosition : position,
    config: config.gentle
  });

  // TODO: Remove this logic and link animation into game transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(!active)
    }, 1000)
    return () => clearInterval(interval)
  }, [active])

  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.mesh position={animatedPosition}>
      {material}
      <RoundedBoxGeometry args={[1, 1, 1]} />
    </animated.mesh>
  )
}

export default React.memo(GelatinousCube)