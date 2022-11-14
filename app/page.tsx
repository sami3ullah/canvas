"use client"

import {FC, useState} from 'react';
import { useDraw } from '../hooks/useDraw';
import {SketchPicker} from 'react-color'
import {defaultColor} from '../utils/constants'

interface pageProps{

}

const Page: FC<pageProps> = ({}) => {

  const [pickerColor, setPickerColor] = useState<string>(defaultColor)
 
  const drawLine = ({ctx, prevPoint, currentPoint}: Draw) => {
    const {x: currX, y: currY} = currentPoint
    const lineWidth = 5

    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath();
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = pickerColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = pickerColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  } 

  const {canvasRef, onMouseDown} = useDraw(drawLine)

  return(  
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
      <SketchPicker color={pickerColor} onChange={e => setPickerColor(e.hex)} />
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}  
        width={750}
        height={750}
        className="border border-black rounded-md"
       />
    </div>
  ) 
}

export default Page;