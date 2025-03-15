"use client";

import { useSpring, useTransform, motion } from "framer-motion";
import { useState, useRef } from "react";
import { BackgroundBoxes } from "@/components/ui-components/background-boxes";
import { ThreeDCard } from "@/components/ui-components/3d-card";
import { AppleCardsCarousel } from "@/components/ui-components/apple-cards-carousel";
import { BackgroundGradientAnimation } from "@/components/ui-components/background-gradient-animation";
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

const InteractiveGradientBackground = ({ mousePos }: InteractiveGradientBackgroundProps) => {
  const offsetX = useSpring(mousePos.x * 0.05, { stiffness: 100, damping: 20 });
  const offsetY = useSpring(mousePos.y * 0.05, { stiffness: 100, damping: 20 });
  const transform = useTransform([offsetX, offsetY], ([x, y]) => `translate(${x}px, ${y}px)`);

  return (
    <motion.div
      className="absolute inset-0 animate-gradient-xy"
      style={{
        transform,
        background: "linear-gradient(45deg, #7e5bef, #ff49db, #ff7849)",
        backgroundSize: "200% 200%",
      }}
    />
  );
};

export default function Home() {
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });
  const servicesRef = useRef<HTMLDivElement>(null);

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

      {/* Our Services Section with enhanced background */}
      <section
        id="services"
        ref={servicesRef}
        className="relative py-20 overflow-hidden"
        onMouseMove={(e) => {
          if (servicesRef.current) {
            const rect = servicesRef.current.getBoundingClientRect();
            setMousePos({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
          }
        }}
      >
        <BackgroundGradientAnimation interactive containerClassName="absolute inset-0" />
  
        {/* Content container remains centered above the background */}
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
