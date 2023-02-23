import { NamedArrayTuple } from '@react-three/drei/helpers/ts-utils'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { Shape, ExtrudeGeometry } from 'three'

const eps = 0.00001

function createShape(width: number, height: number, radius0: number) {
  const shape = new Shape()
  const radius = radius0 - eps
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true)
  shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true)
  shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true)
  shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true)
  return shape
}

type Props = {
  args?: NamedArrayTuple<(width: number, height: number, depth: number) => void>
  radius?: number
  smoothness?: number
  steps?: number
} & Omit<JSX.IntrinsicElements['mesh'], 'args'>

export const RoundedBoxGeometry = (
  props: Props,
) => {
  const { args = [1, 1, 1], radius = 0.05, smoothness = 4, steps = 1, ...rest } = props
  const [width, height, depth] = args
  const shape = useMemo(() => createShape(width, height, radius), [width, height, radius])
  const params = useMemo(
    () => ({
      depth: depth - radius * 2,
      bevelEnabled: true,
      bevelSegments: smoothness * 2,
      steps,
      bevelSize: radius - eps,
      bevelThickness: radius,
      curveSegments: smoothness,
    }),
    [depth, radius, smoothness]
  )
  const geomRef = useRef<ExtrudeGeometry>(null!)

  useLayoutEffect(() => {
    if (geomRef.current) {
      geomRef.current.center()
    }
  }, [shape, params])

  return (
    <extrudeGeometry ref={geomRef} args={[shape, params]} />
  )
}