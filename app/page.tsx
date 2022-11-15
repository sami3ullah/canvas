"use client"

import {FC, useState} from 'react';
import { useDraw } from '../hooks/useDraw';
import {defaultColor} from '../utils/constants'
import {HexAlphaColorPicker} from 'react-colorful';

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

  const {canvasRef, onMouseDown, clearCanvas} = useDraw(drawLine)

  return(  
    <div className='w-screen h-screen bg-[#7A2A3B] flex justify-center items-center'>
      <div className='flex flex-col gap-10 pr-10'>
        <HexAlphaColorPicker color={pickerColor} onChange={e => setPickerColor(e)} />
        <button
        type="button"
        className='p-2 rounded-md border bg-white'
        onClick={clearCanvas}
        >
          Clear Canvas
        </button>
      </div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={1000}
        height={750}
        className="border rounded-md bg-white"
       />
    </div>
  ) 
}

export default Page;