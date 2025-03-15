"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import Image from "next/image"

const CARD_WIDTH = 320
const CARD_HEIGHT = 480
const MARGIN = 20
const CARD_SIZE = CARD_WIDTH + MARGIN

export const AppleCardsCarousel = () => {
  const [width, setWidth] = useState(0)
  const [activeCard, setActiveCard] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const controls = useAnimation()

  const projects = [
    {
      id: 1,
      title: "Brand Redesign",
      category: "Branding",
      image: "/pexels-volkerthimm-19049367.jpg",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      category: "E-commerce",
      image: "/pexels-cottonbro-5077061.jpg",
    },
    {
      id: 3,
      title: "Mobile App Design",
      category: "UI/UX",
      image: "/pexels-nathanjhilton-8021284.jpg",
    },
    {
      id: 4,
      title: "Marketing Campaign",
      category: "Digital Marketing",
      image: "/pexels-huuhuynh-18485748.jpg",
    },
    {
      id: 5,
      title: "Corporate Website",
      category: "Web Design",
      image: "/pexels-drew-williams-1285451-3098683.jpg",
    },
  ]

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const handleDragEnd = () => {
    const currentOffset = x.get()
    let newActiveCard = Math.round(Math.abs(currentOffset) / CARD_SIZE)

    // Ensure we don't go beyond the bounds
    newActiveCard = Math.max(0, Math.min(newActiveCard, projects.length - 1))

    const targetOffset = -newActiveCard * CARD_SIZE
    controls.start({ x: targetOffset })
    setActiveCard(newActiveCard)
  }

  const handleCardClick = (index: number) => {
    setActiveCard(index)
    controls.start({ x: -index * CARD_SIZE })
  }

  return (
    <div className="relative overflow-hidden py-12">
      <motion.div
        ref={containerRef}
        className="flex cursor-grab"
        drag="x"
        dragConstraints={{ left: -width, right: 0 }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`relative min-w-[320px] h-[480px] rounded-2xl overflow-hidden mx-[10px] transition-shadow duration-300 ${
              activeCard === index ? "shadow-2xl" : "shadow-lg"
            }`}
            animate={{
              scale: activeCard === index ? 1.05 : 0.95,
              opacity: activeCard === index ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCardClick(index)}
            whileHover={{ scale: activeCard === index ? 1.05 : 1 }}
          >
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <span className="text-rose-300 text-sm font-medium mb-2 block">{project.category}</span>
              <h3 className="text-white text-2xl font-bold">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center mt-8 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${activeCard === index ? "bg-rose-500" : "bg-gray-400"}`}
            onClick={() => handleCardClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
