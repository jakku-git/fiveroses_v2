"use client";

import { useMotionValue, useTransform, useSpring, motion } from "framer-motion";
import { useState, useEffect } from "react";
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

type AnimatedTextProps = {
  text: string;
  duration?: number;
  className?: string;
};

const AnimatedText = ({ text, duration = 0.5, className = "" }: AnimatedTextProps) => {
  return <div className={className}>{text} (duration: {duration})</div>;
};

type MousePos = {
  x: number;
  y: number;
};

type InteractiveGradientBackgroundProps = {
  mousePos: MousePos;
};

const InteractiveGradientBackground = ({ mousePos }: InteractiveGradientBackgroundProps) => {
  // Initialize motion values with the current mouse position.
  const x = useMotionValue(mousePos.x);
  const y = useMotionValue(mousePos.y);

  // Update the motion values when mousePos changes.
  useEffect(() => {
    x.set(mousePos.x);
    y.set(mousePos.y);
  }, [mousePos.x, mousePos.y, x, y]);

  // Create smooth spring animations for smoother movement.
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  // Use a transform to create a subtle parallax offset.
  const backgroundPosition = useTransform([springX, springY], ([latestX, latestY]) => {
    return `${(latestX as number) * 0.05}px ${(latestY as number) * 0.05}px`;
  });

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(45deg, #7e5bef, #ff49db, #ff7849)",
        backgroundSize: "200% 200%",
        backgroundPosition: backgroundPosition,
      }}
    />
  );
};

export default function Home() {
  // Track the mouse position for the interactive background.
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />

      <AnimatedText text="Welcome to Our Services" className="text-center text-3xl mb-8" />

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">About Us</h2>
          <BackgroundBoxes />
        </div>
      </section>

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
