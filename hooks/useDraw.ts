import { useEffect, useRef, useState } from "react"

export const useDraw = (onDraw: ({ctx, currentPoint, prevPoint}: Draw) => void ) => {
  
  const [mouseDown, setMouseDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevPoint = useRef<null | Point>(null)

  const onMouseDown = () => setMouseDown(true)

  useEffect(() => {

    const computePointsInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current
      
      if(!canvas) return

      const rect = canvas.getBoundingClientRect()
      
      const x = (e.clientX - rect.left)
      const y = (e.clientY - rect.top)

      return {x, y}
    }

    const handler = (e: MouseEvent) => {
      if(!mouseDown) return

      const currentPoint = computePointsInCanvas(e)
      const ctx = canvasRef.current?.getContext('2d');
      
      // if there's no context or points then simply do nothing
      if(!ctx || !currentPoint) return

      onDraw({ctx, currentPoint, prevPoint: prevPoint.current})
      // now setting the current point to prev point
      prevPoint.current = currentPoint
    }

    const mouseUpHandler = () => {
      setMouseDown(false)
      prevPoint.current = null
    }

    // add event listener
    canvasRef.current?.addEventListener("mousemove", handler)
    window.addEventListener('mouseup', mouseUpHandler)

    // useEffect cleanup
    return () => {
      canvasRef.current?.removeEventListener("mousemove", handler)
      window.addEventListener('mouseup', mouseUpHandler)

    }
  }, [onDraw])

  return {canvasRef, onMouseDown}
}