"use client";

import { useSpring, useTransform, motion } from "framer-motion";
import { useState } from "react";
import { BackgroundBoxes } from "@/components/ui-components/background-boxes";
import { ThreeDCard } from "@/components/ui-components/3d-card";
import { AppleCardsCarousel } from "@/components/ui-components/apple-cards-carousel";
import { BentoGrid } from "@/components/ui-components/bento-grid";
import { CanvasReveal } from "@/components/ui-components/canvas-reveal";
import { CardHoverEffect } from "@/components/ui-components/card-hover-effect";
import { CardSpotlight } from "@/components/ui-components/card-spotlight";
import { Carousel } from "@/components/ui-components/carousel";
import { Compare } from "@/components/ui-components/compare";
import { ContainerScroll } from "@/components/ui-components/container-scroll";
import { EvervaultCard } from "@/components/ui-components/evervault-card";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";



type MousePos = { x: number; y: number };

type InteractiveGradientBackgroundProps = {
  mousePos: MousePos;
};

/**
 * InteractiveGradientBackground
 *
 * This component renders a full-edge, continuously animated gradient background
 * using the CSS animation defined in globals.css (.animate-gradient-xy). It also applies
 * an interactive translate effect (using Framer Motion) based on the mouse position.
 */
const InteractiveGradientBackground = ({ mousePos }: InteractiveGradientBackgroundProps) => {
  // Compute a subtle offset based on the mouse position.
  // Multiply by a small factor (0.05) for a gentle parallax effect.
  const offsetX = useSpring(mousePos.x * 0.05, { stiffness: 100, damping: 20 });
  const offsetY = useSpring(mousePos.y * 0.05, { stiffness: 100, damping: 20 });
  const transform = useTransform([offsetX, offsetY], ([x, y]) => `translate(${x}px, ${y}px)`);

  return (
    <motion.div
      className="absolute inset-0 animate-gradient-xy"
      style={{
        transform,
        // The CSS animation from globals.css is applied via the class.
        background: "linear-gradient(45deg, #7e5bef, #ff49db, #ff7849)",
        backgroundSize: "200% 200%",
      }}
    />
  );
};

export default function Home() {
  // Track mouse position for the interactive background.
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">About Us</h2>
          <BackgroundBoxes />
        </div>
      </section>

      {/* "Our Services" Section with full-width interactive gradient background */}
      <section
        id="services"
        className="relative py-20 overflow-hidden"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        {/* The interactive gradient background sits edge-to-edge */}
        <InteractiveGradientBackground mousePos={mousePos} />
        {/* Content container remains centered and sits above the gradient */}
        <div className="relative container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Services</h2>
          <BentoGrid />
        </div>
      </section>

      <section id="work" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Work</h2>
          <AppleCardsCarousel />
        </div>
      </section>

      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ThreeDCard />
            <CardSpotlight />
            <EvervaultCard />
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Testimonials</h2>
          <Carousel />
        </div>
      </section>

      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Projects</h2>
          <CardHoverEffect />
        </div>
      </section>

      <section id="showcase" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Showcase</h2>
          <Compare />
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Contact Us</h2>
          <ContainerScroll />
        </div>
      </section>

      <CanvasReveal />
      <Footer />
    </main>
  );
}
