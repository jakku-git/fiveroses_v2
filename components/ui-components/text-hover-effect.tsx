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
      const cxPercentage = ((cursor.x - svgRect
