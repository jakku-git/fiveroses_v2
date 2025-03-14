"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TextGenerateEffect } from "@/components/ui-components/text-generate-effect"
import { TextHoverEffect } from "@/components/ui-components/text-hover-effect" // ✅ Import the Text Hover Effect

export const BackgroundBoxes = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const rows = 20
  const cols = 20

  const generateRandomColor = () => {
    const colors = ["#FF5F6D", "#FFC371", "#FF9A8B", "#FF6A88", "#FF99AC"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="h-[40rem] relative overflow-hidden bg-black flex items-center justify-center rounded-lg">
      {mounted && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 0,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => {
            const row = Math.floor(i / cols)
            const col = i % cols
            return (
              <motion.div
                key={i}
                className="bg-white/[0.01] border border-white/[0.05] relative"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 2,
                  delay: (row + col) * 0.1,
                }}
                whileHover={{
                  backgroundColor: generateRandomColor(),
                  opacity: 0.8,
                  transition: { duration: 0 },
                }}
              />
            )
          })}
        </div>
      )}

      <div className="relative z-10 text-center px-6">
        {/* ✅ Replace "fiveroses" with the Text Hover Effect */}
        <TextHoverEffect 
          words="fiveroses" 
          className="text-6xl md:text-8xl font-bold mb-6 text-white"
        />

        {/* ✅ Keep the description using the Text Generate Effect */}
        <TextGenerateEffect
          words="a creative digital agency focused on growing brands through strategic and innovative marketing solutions."
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
        />
      </div>
    </div>
  )
}
