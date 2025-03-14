"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export const CardSpotlight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative h-96 w-full rounded-xl bg-gradient-to-br from-rose-500 to-rose-900 p-px overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,95,109,.15), transparent 40%)`,
        }}
      />

      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <Image src="/placeholder.svg?height=400&width=300" alt="Team member" fill className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative h-full p-6 flex flex-col justify-end z-10">
        <h3 className="text-2xl font-bold text-white mb-2">Michael Chen</h3>
        <p className="text-rose-300 mb-4">Technical Director</p>
        <p className="text-white/80 text-sm">
          Michael brings technical expertise and innovation to every project, ensuring seamless implementation and
          optimal performance.
        </p>
      </div>
    </motion.div>
  )
}

