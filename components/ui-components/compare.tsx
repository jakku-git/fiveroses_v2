"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export const Compare = () => {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100))

    setPosition(percentage)
  }

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove as any)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove as any)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Before & After</h3>
        <p className="text-white/70">See the transformation in our design work</p>
      </div>

      <div
        ref={containerRef}
        className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden cursor-col-resize"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 z-10">
          <Image src="/pexels-cottonbro-9748522.jpg" alt="After" fill className="object-cover" />
        </div>

        <div className="absolute inset-0 z-20 overflow-hidden" style={{ width: `${position}%` }}>
          <Image
            src="/pexels-artempodrez-6800941.jpg"
            alt="Before"
            fill
            className="object-cover"
            style={{ width: `${100 / (position / 100)}%` }}
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-30"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-rose-500" />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 z-40 bg-black/70 text-white px-3 py-1 rounded-md text-sm">Before</div>

        <div className="absolute bottom-4 right-4 z-40 bg-black/70 text-white px-3 py-1 rounded-md text-sm">After</div>
      </div>
    </div>
  )
}

