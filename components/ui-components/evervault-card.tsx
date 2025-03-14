"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export const EvervaultCard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  const calculateTransform = () => {
    if (!isHovered) return "none"

    const { x, y } = mousePosition
    const rotateX = (y - 0.5) * 20
    const rotateY = (x - 0.5) * -20

    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative h-96 w-full rounded-xl bg-gradient-to-br from-rose-500 to-rose-900 p-px overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: calculateTransform(),
        transition: "transform 0.2s ease-out",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,95,109,0.1),_transparent_70%)]" />

        <svg className="absolute inset-0 w-full h-full z-0 opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={i * 5}
              x2="100"
              y2={i * 5}
              strokeWidth="0.5"
              stroke="rgba(255, 255, 255, 0.1)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i + 20}
              x1={i * 5}
              y1="0"
              x2={i * 5}
              y2="100"
              strokeWidth="0.5"
              stroke="rgba(255, 255, 255, 0.1)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <Image src="/placeholder.svg?height=400&width=300" alt="Team member" fill className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative h-full p-6 flex flex-col justify-end z-10">
        <h3 className="text-2xl font-bold text-white mb-2">Alex Rivera</h3>
        <p className="text-rose-300 mb-4">Design Lead</p>
        <p className="text-white/80 text-sm">
          Alex combines artistic vision with strategic thinking to create designs that are both beautiful and effective.
        </p>
      </div>
    </motion.div>
  )
}

