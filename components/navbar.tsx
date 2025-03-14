"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          fiveroses.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="#work" className="text-white hover:text-rose-400 transition-colors">
            Work
          </Link>
          <Link href="#about" className="text-white hover:text-rose-400 transition-colors">
            About
          </Link>
          <Link href="#services" className="text-white hover:text-rose-400 transition-colors">
            Services
          </Link>
          <Link href="#contact" className="text-white hover:text-rose-400 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black z-40 pt-20">
          <nav className="flex flex-col items-center space-y-8 p-8">
            <Link
              href="#work"
              className="text-2xl text-white hover:text-rose-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Work
            </Link>
            <Link
              href="#about"
              className="text-2xl text-white hover:text-rose-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-2xl text-white hover:text-rose-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="text-2xl text-white hover:text-rose-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

