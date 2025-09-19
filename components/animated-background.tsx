"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = []
    const nodeCount = 35
    const streamChars = "01<>#@"
    const streams: Array<{ x: number; y: number; speed: number; char: string }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Nodes
      nodes.length = 0
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
        })
      }

      // Streams
      streams.length = 0
      const streamCount = Math.floor(canvas.width / 12)
      for (let i = 0; i < streamCount; i++) {
        streams.push({
          x: i * 12,
          y: Math.random() * canvas.height,
          speed: 1.5 + Math.random() * 2.5,
          char: streamChars[Math.floor(Math.random() * streamChars.length)],
        })
      }
    }

    const animate = () => {
      time += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#f5f5f5")
      gradient.addColorStop(0.5, "#e0e0e0")
      gradient.addColorStop(1, "#f5f5f5")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Digital streams (brighter)
      ctx.font = `${Math.max(14, canvas.width * 0.01)}px monospace`
      streams.forEach((s) => {
        ctx.fillStyle = "rgba(239, 131, 84, 0.7)" // bright orange-red hacker code
        ctx.fillText(s.char, s.x, s.y)
        s.y += s.speed
        if (s.y > canvas.height) {
          s.y = -20
          s.char = streamChars[Math.floor(Math.random() * streamChars.length)]
        }
      })

      // Nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(79, 93, 117, 0.9)" // darker and visible
        ctx.fill()
      })

      // Connect nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            ctx.strokeStyle = `rgba(79, 93, 117, ${0.4 - dist / 400})` // brighter lines
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Floating particle bits (brighter)
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = 1 + Math.random() * 2
        ctx.fillStyle = `rgba(239, 131, 84, ${0.2 + Math.random() * 0.3})` // bright tech bits
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />
}