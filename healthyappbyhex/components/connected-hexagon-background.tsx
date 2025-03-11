"use client"

import type React from "react"
import { useEffect, useRef } from "react"

const ConnectedHexagonBackground: React.FC = () => {
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

    const hexagons: { x: number; y: number; size: number }[] = []
    const numHexagons = 30
    const maxDistance = 150

    for (let i = 0; i < numHexagons; i++) {
      hexagons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
      })
    }

    const drawHexagon = (x: number, y: number, size: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(hx, hy)
        } else {
          ctx.lineTo(hx, hy)
        }
      }
      ctx.closePath()
    }

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      hexagons.forEach((hexagon, index) => {
        hexagon.x += Math.sin(time + index) * 0.5
        hexagon.y += Math.cos(time + index) * 0.5

        if (hexagon.x < 0) hexagon.x = canvas.width
        if (hexagon.x > canvas.width) hexagon.x = 0
        if (hexagon.y < 0) hexagon.y = canvas.height
        if (hexagon.y > canvas.height) hexagon.y = 0

        ctx.strokeStyle = "rgba(0, 123, 255, 0.2)"
        drawHexagon(hexagon.x, hexagon.y, hexagon.size)
        ctx.stroke()
      })

      for (let i = 0; i < hexagons.length; i++) {
        for (let j = i + 1; j < hexagons.length; j++) {
          const dx = hexagons[i].x - hexagons[j].x
          const dy = hexagons[i].y - hexagons[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(hexagons[i].x, hexagons[i].y)
            ctx.lineTo(hexagons[j].x, hexagons[j].y)
            ctx.strokeStyle = `rgba(0, 123, 255, ${0.1 * (1 - distance / maxDistance)})`
            ctx.stroke()
          }
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

export default ConnectedHexagonBackground

