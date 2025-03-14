"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export const CardHoverEffect = () => {
  const projects = [
    {
      title: "E-commerce Redesign",
      description:
        "Complete redesign of an e-commerce platform focusing on user experience and conversion optimization.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Mobile Banking App",
      description: "Intuitive mobile banking application with advanced security features and seamless user experience.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Restaurant Branding",
      description:
        "Comprehensive branding project for a high-end restaurant chain, including logo, website, and print materials.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Travel Platform",
      description: "Feature-rich travel booking platform with personalized recommendations and interactive maps.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {projects.map((project, i) => (
        <ProjectCard key={i} project={project} />
      ))}
    </div>
  )
}

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
  }
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="aspect-video relative">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-white/80 mb-4 text-sm">{project.description}</p>

        <motion.div
          className="flex items-center text-rose-400 font-medium"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          View Project
          <ArrowRight className="ml-2 h-4 w-4" />
        </motion.div>
      </div>
    </motion.div>
  )
}

