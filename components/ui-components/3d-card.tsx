"use client"

import type React from "react"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export const ThreeDCard = () => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2

    const mouseX = e.clientX
    const mouseY = e.clientY

    // Calculate rotation values based on mouse position relative to card center
    const rotateYValue = ((mouseX - cardCenterX) / (rect.width / 2)) * 15
    const rotateXValue = ((cardCenterY - mouseY) / (rect.height / 2)) * 15

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative h-96 w-full rounded-xl bg-gradient-to-br from-rose-500 to-rose-900 p-px overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute inset-0 bg-black rounded-xl z-10 p-6 flex flex-col justify-end transform-style-3d">
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <Image
            src="/placeholder.svg?height=400&width=300"
            alt="Team member"
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <div className="relative z-20">
          <h3 className="text-2xl font-bold text-white mb-2">Sarah Johnson</h3>
          <p className="text-rose-300 mb-4">Creative Director</p>
          <p className="text-white/80 text-sm">
            With over 10 years of experience in design and branding, Sarah leads our creative team with passion and
            innovation.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

