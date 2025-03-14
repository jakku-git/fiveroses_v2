"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      const xPercent = x / rect.width
      const yPercent = y / rect.height

      const images = containerRef.current.querySelectorAll(".hero-image")
      images.forEach((img, index) => {
        const factor = (index + 1) * 10
        ;(img as HTMLElement).style.transform =
          `translate(${(xPercent - 0.5) * factor}px, ${(yPercent - 0.5) * factor}px)`
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
        <div className="grid grid-cols-3 h-full">
          <div className="relative overflow-hidden">
            <div className="hero-image absolute inset-0 transition-transform duration-500 ease-out">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Creative visual"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div className="hero-image absolute inset-0 transition-transform duration-500 ease-out">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Creative visual"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div className="hero-image absolute inset-0 transition-transform duration-500 ease-out">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Creative visual"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">FiveRoses</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
            Crafting digital experiences that bloom with creativity and innovation
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
          >
            Explore Our Work
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

