"use client"

import { useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const ContainerScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <div ref={containerRef} className="relative h-[80vh] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-black rounded-xl"
        style={{ opacity, scale }}
      />

      <motion.div className="relative z-10 h-full flex flex-col items-center justify-center p-8" style={{ y, opacity }}>
        <div className="max-w-md w-full mx-auto">
          <h3 className="text-3xl font-bold text-white mb-6 text-center">Get in Touch</h3>
          <p className="text-white/70 mb-8 text-center">
            Ready to start your next project? Contact us today for a free consultation.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-white text-sm mb-1 block">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-white text-sm mb-1 block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="text-white text-sm mb-1 block">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="Project inquiry"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-white text-sm mb-1 block">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
              />
            </div>

            <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">Send Message</Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

