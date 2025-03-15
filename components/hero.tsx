"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Custom animated headline component
const headlineText = "BRING YOUR IDEAS ALIVE";

const AnimatedHeadline = () => {
  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white inline-block">
      {headlineText.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          // The animation mimics a type-generation and vanish effect:
          // 1. The letter appears (opacity goes 0→1 while moving upward),
          // 2. It stays visible briefly,
          // 3. Then it fades out (opacity 1→0 with a slight upward shift),
          // 4. And loops continuously.
          animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
          transition={{
            times: [0, 0.3, 0.7, 1],
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1,
            delay: index * 0.1, // stagger each character for a generating effect
          }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      const videos = containerRef.current.querySelectorAll(".hero-video");
      videos.forEach((video, index) => {
        const factor = (index + 1) * 10;
        (video as HTMLElement).style.transform = `translate(${
          (xPercent - 0.5) * factor
        }px, ${(yPercent - 0.5) * factor}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleExploreWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/60 z-10" />
        <div className="grid grid-cols-3 h-full">
          <div className="relative overflow-hidden">
            <div className="hero-video absolute inset-0 transition-transform duration-500 ease-out">
              <video
                src="https://videos.pexels.com/video-files/18069237/18069237-uhd_1440_1440_24fps.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div className="hero-video absolute inset-0 transition-transform duration-500 ease-out">
              <video
                src="https://videos.pexels.com/video-files/17485992/17485992-uhd_1440_1800_25fps.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div className="hero-video absolute inset-0 transition-transform duration-500 ease-out">
              <video
                src="https://videos.pexels.com/video-files/18069473/18069473-sd_360_640_24fps.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center">
        <AnimatedHeadline />
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-white/80">
          YOUR BRAND'S STORY STARTS HERE
        </p>
        <motion.button
          onClick={handleExploreWork}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
        >
          Explore Our Work
        </motion.button>
      </div>
    </section>
  );
}
