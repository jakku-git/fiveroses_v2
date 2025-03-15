"use client";

import { useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect } from "react";
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

/* 
  Fix for the error regarding the missing 'className' prop:
  We update our example AnimatedText component to accept a 'className'.
*/
type AnimatedTextProps = {
  text: string;
  duration?: number;
  className?: string;
};

const AnimatedText = ({ text, duration = 0.5, className = "" }: AnimatedTextProps) => {
  return <div className={className}>{text} (duration: {duration})</div>;
};

/* 
  Interactive Gradient Background:
  This component covers the entire section and updates its background position based on the mouse cursor.
*/
const InteractiveGradientBackground = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const backgroundPosition = useTransform([x, y], ([latestX, latestY]) => {
    return `${latestX}px ${latestY}px`;
  });

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(45deg, #7e5bef, #ff49db, #ff7849)",
        backgroundSize: "200% 200%",
        backgroundPosition: backgroundPosition,
      }}
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    />
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />

      {/* Example usage of AnimatedText */}
      <AnimatedText text="Welcome to Our Services" className="text-center text-3xl mb-8" />

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">About Us</h2>
          <BackgroundBoxes />
        </div>
      </section>

      {/* "Our Services" Section with full-width interactive gradient background */}
      <section id="services" className="relative py-20 overflow-hidden">
        {/* Interactive gradient background that covers the entire section */}
        <InteractiveGradientBackground />
        {/* Content container remains centered */}
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
