"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion" // ✅ Fix import

export const TextHoverEffect = ({
  text,
  duration = 0.5,
}: {
  text: string
  duration?: number
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      })
    }
  }, [cursor])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD700" /> {/* Gold */}
          <stop offset="25%" stopColor="#FF6347" /> {/* Tomato */}
          <stop offset="50%" stopColor="#1E90FF" /> {/* DodgerBlue */}
          <stop offset="75%" stopColor="#00CED1" /> {/* DarkTurquoise */}
          <stop offset="100%" stopColor="#8A2BE2" /> {/* BlueViolet */}
        </linearGradient>

        {/* ✅ Fixed: Directly animate mask position */}
        <radialGradient id="revealMask" gradientUnits="userSpaceOnUse">
          <motion.stop
            offset="0%"
            stopColor="white"
            animate={{ cx: maskPosition.cx, cy: maskPosition.cy }}
            transition={{ duration: duration, ease: "easeOut" }}
          />
          <stop offset="100%" stopColor="black" />
        </radialGradient>

        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Text Outline */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="font-[helvetica] font-bold fill-transparent text-8xl stroke-neutral-200 dark:stroke-neutral-800"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      {/* Masked Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.5"
        mask="url(#textMask)"
        className="font-[helvetica] font-bold fill-transparent text-8xl"
      >
        {text}
      </text>
    </svg>
  )
}
