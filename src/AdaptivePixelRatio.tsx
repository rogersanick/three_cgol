import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

function AdaptivePixelRatio() {
  const gl = useThree((state) => state.gl)
  const current = useThree((state) => state.performance.current)
  const initialDpr = useThree((state) => state.viewport.initialDpr)
  const setDpr = useThree((state) => state.setDpr)

  // Restore initial pixelratio on unmount
  useEffect(() => {
    const domElement = gl.domElement
    return () => {
      setDpr(initialDpr)
      domElement.style.imageRendering = 'auto'
    }
  }, [])

  // Set adaptive pixelratio
  useEffect(() => {
    setDpr(current * initialDpr)
    gl.domElement.style.imageRendering = current === 1 ? 'auto' : 'pixelated'
  }, [current])
  
  return null
}

export default AdaptivePixelRatio