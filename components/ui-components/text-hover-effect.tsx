"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

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
        {/* ✅ Updated to make gradient colors brighter */}
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD700" /> {/* Gold */}
          <stop offset="25%" stopColor="#FF4500" /> {/* OrangeRed */}
          <stop offset="50%" stopColor="#00BFFF" /> {/* DeepSkyBlue */}
          <stop offset="75%" stopColor="#7CFC00" /> {/* LawnGreen */}
          <stop offset="100%" stopColor="#FF69B4" /> {/* HotPink */}
        </linearGradient>

        {/* ✅ Bright radial glow effect */}
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

      {/* ✅ Added glow effect to make text visible */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1"
        className="font-[helvetica] font-bold fill-transparent text-8xl stroke-white drop-shadow-lg"
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

      {/* ✅ Gradient-filled masked text */}
      <text
  x="50%"
  y="50%"
  textAnchor="middle"
  dominantBaseline="middle"
  stroke="white" // ✅ Force white stroke
  fill="white" // ✅ Force white fill
  strokeWidth="0.7"
  mask="url(#textMask)"
  className="font-[helvetica] font-bold text-8xl bg-red-500" // ✅ TEMP background color
>
  {text}
</text>
    </svg>
  )
}
