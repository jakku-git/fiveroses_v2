"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export const TextHoverEffect = ({
  text,
  duration = 0.3, // ✅ Slightly faster effect for instant feedback
}: {
  text: string
  duration?: number
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%", r: "25%" }) // ✅ Increased default radius

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
        r: "50%", // ✅ Expanded hover radius to ensure full coverage
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
        {/* ✅ Stronger pastel red hover effect */}
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF8080" /> {/* Soft Red */}
          <stop offset="50%" stopColor="#FF6666" /> {/* Stronger Pastel Red */}
          <stop offset="100%" stopColor="#FF4D4D" /> {/* Deeper Coral Red */}
        </linearGradient>

        {/* ✅ Expanded reveal area for better hover effect */}
        <radialGradient id="revealMask" gradientUnits="userSpaceOnUse">
          <motion.stop
            offset="0%"
            stopColor="white"
            animate={{ cx: maskPosition.cx, cy: maskPosition.cy, r: maskPosition.r }}
            transition={{ duration: duration, ease: "easeOut" }}
          />
          <stop offset="100%" stopColor="black" />
        </radialGradient>

        {/* ✅ Ensure full coverage of the entire word */}
        <mask id="textMask">
          <motion.circle
            cx="50%"
            cy="50%"
            r="25%" // ✅ Increased starting size
            fill="url(#revealMask)"
            animate={{ cx: maskPosition.cx, cy: maskPosition.cy, r: maskPosition.r }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </mask>
      </defs>

      {/* ✅ White stroke ensures text is always visible */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1"
        className="font-[helvetica] font-bold fill-transparent text-4xl md:text-5xl stroke-white drop-shadow-lg"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      {/* ✅ More visible hover effect */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.5"
        mask="url(#textMask)"
        className="font-[helvetica] font-bold text-4xl md:text-5xl"
      >
        {text}
      </text>
    </svg>
  )
}
