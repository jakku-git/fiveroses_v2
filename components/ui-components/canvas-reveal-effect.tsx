"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export const CanvasReveal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth
        canvas.height = canvas.parentElement.offsetHeight
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Animation variables
    let particles: {
      x: number
      y: number
      radius: number
      color: string
      velocity: { x: number; y: number }
    }[] = []

    const colors = ["#FF5F6D", "#FFC371", "#FF9A8B", "#FF6A88", "#FF99AC"]

    // Create particles
    const createParticles = () => {
      particles = []
      const particleCount = 50

      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 5 + 2
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const color = colors[Math.floor(Math.random() * colors.length)]
        const velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        }

        particles.push({ x, y, radius, color, velocity })
      }
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Update position
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y

        // Bounce off walls
        if (particle.x + particle.radius > canvas.width || particle.x - particle.radius < 0) {
          particle.velocity.x = -particle.velocity.x
        }

        if (particle.y + particle.radius > canvas.height || particle.y - particle.radius < 0) {
          particle.velocity.y = -particle.velocity.y
        }
      })
    }

    createParticles()
    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] flex items-center justify-center">
      <motion.div className="relative w-full h-full" style={{ opacity, scale }}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </motion.div>
    </div>
  )
}

