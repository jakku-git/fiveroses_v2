"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    {
      name: "Emma Thompson",
      role: "CEO, TechStart",
      content:
        "Working with FiveRoses was a game-changer for our brand. Their creative approach and technical expertise transformed our digital presence completely.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "David Chen",
      role: "Marketing Director, Innovate Inc",
      content:
        "The team at FiveRoses delivered beyond our expectations. Their attention to detail and strategic thinking helped us achieve remarkable growth.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Sarah Johnson",
      role: "Founder, Bloom Boutique",
      content:
        "FiveRoses understood our vision perfectly and brought it to life with stunning design and flawless functionality. Couldn't be happier with the results.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, autoplay])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative overflow-hidden py-12 px-4">
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
        <button
          onClick={prevSlide}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
          aria-label="Previous testimonial"
          onFocus={() => setAutoplay(false)}
          onBlur={() => setAutoplay(true)}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
        <button
          onClick={nextSlide}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
          aria-label="Next testimonial"
          onFocus={() => setAutoplay(false)}
          onBlur={() => setAutoplay(true)}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col items-center text-center"
          >
            <Quote className="h-12 w-12 text-rose-500 mb-6" />
            <p className="text-xl md:text-2xl text-white mb-8 italic">"{testimonials[currentIndex].content}"</p>
            <div className="flex items-center">
              <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-white">{testimonials[currentIndex].name}</h4>
                <p className="text-rose-400">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-rose-500" : "bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            onFocus={() => setAutoplay(false)}
            onBlur={() => setAutoplay(true)}
          />
        ))}
      </div>
    </div>
  )
}

