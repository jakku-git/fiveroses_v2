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

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />

      {/* About Us Section */}
      <section id="about" className="relative">
        <div className="relative h-[40rem]">
          {/* Full-width background with edge-to-edge effect */}
          <BackgroundBoxes />
          {/* Centered header over the background */}
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <h2 className="text-4xl md:text-5xl font-bold text-white">About Us</h2>
          </div>
        </div>
        {/* Additional About Us content below the background */}
        <div className="container mx-auto px-4 mt-10">
          <p className="text-white">
            A creative digital agency focused on growing brands through strategic and innovative marketing solutions.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="relative py-20 overflow-hidden"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <InteractiveGradientBackground mousePos={mousePos} />
        <div className="relative container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Services</h2>
          <BentoGrid />
        </div>
      </section>

      {/* Our Work Section */}
      <section id="work" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Work</h2>
          <AppleCardsCarousel />
        </div>
      </section>

      {/* Our Team Section */}
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Testimonials</h2>
          <Carousel />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Projects</h2>
          <CardHoverEffect />
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Showcase</h2>
          <Compare />
        </div>
      </section>

      {/* Contact Section */}
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
