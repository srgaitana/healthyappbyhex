"use client"

import type React from "react"
import { useEffect, useRef } from "react"

const HexagonalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const hexSize = 30
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const hexVerticalOffset = hexHeight * 0.75

    const columns = Math.ceil(canvas.width / hexWidth) + 1
    const rows = Math.ceil(canvas.height / hexVerticalOffset) + 1

    const drawHexagon = (x: number, y: number, size: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const xPos = x + size * Math.cos(angle)
        const yPos = y + size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(xPos, yPos)
        } else {
          ctx.lineTo(xPos, yPos)
        }
      }
      ctx.closePath()
    }

    let offset = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      offset = (offset + 0.2) % hexVerticalOffset

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < columns; col++) {
          const x = col * hexWidth + (row % 2 === 0 ? hexSize : 0)
          const y = row * hexVerticalOffset + offset

          ctx.strokeStyle = `rgba(0, 123, 255, ${Math.random() * 0.1 + 0.05})`
          drawHexagon(x, y, hexSize)
          ctx.stroke()
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

export default HexagonalBackground

