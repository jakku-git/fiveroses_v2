"use client"

import { motion } from "framer-motion"
import { Code, Palette, Globe, Lightbulb, BarChart, Zap } from "lucide-react"

export const BentoGrid = () => {
  const services = [
    {
      title: "Web Development",
      description:
        "Building innovative, responsive, fast, and user-friendly websites and web applications.",
      icon: <Code className="h-8 w-8 text-rose-400" />,
      className: "md:col-span-2",
    },
    {
      title: "Branding",
      description:
        "Developing unique brand identities that resonate with your target audience.",
      icon: <Palette className="h-8 w-8 text-rose-400" />,
      className: "md:col-span-1",
    },
    {
      title: "Optimization",
      description:
        "Enhancing website speed and performance for better user experience and SEO.",
      icon: <Globe className="h-8 w-8 text-rose-400" />,
      className: "md:col-span-1",
    },
    {
      title: "Strategy",
      description:
        "Crafting digital strategies that align with your business goals and objectives.",
      icon: <Lightbulb className="h-8 w-8 text-rose-400" />,
      className: "md:col-span-1",
    },
    {
      title: "Digital Marketing",
      description:
        "Driving growth through targeted digital marketing campaigns and SEO optimization.",
      icon: <BarChart className="h-8 w-8 text-rose-400" />,
      className: "md:col-span-1",
    },
    {
      title: "Performance Optimization",
      description:
        "Enhancing website speed and performance for better user experience and SEO.",
      icon: <Zap className="h-8 w-8 text-rose-400" />,
      className: "md:col-span-2",
    },
  ]

  return (
    <section className="w-full py-20 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-xy overflow-hidden">
      {/* Inner container for centered content */}
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 30px -10px rgba(255, 95, 109, 0.4)",
                borderColor: "rgba(255, 95, 109, 0.3)",
              }}
            >
              <div className={service.className}>
                <div className="bg-black border border-white/10 rounded-xl p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-sm flex-grow">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
