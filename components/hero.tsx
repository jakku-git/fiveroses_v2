"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const headlineText = "BRING YOUR IDEAS ALIVE";

const AnimatedHeadline = () => {
  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
      {headlineText.split("").map((char, index) => {
        // Render a non-animated space to preserve spacing.
        if (char === " ") {
          return <span key={index}>&nbsp;</span>;
        }
        return (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: [0, 0, 0, -5] }}
            transition={{
              delay: index * 0.15,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        );
      })}
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
      const xPercent = (clientX - rect.left) / rect.width;
      const yPercent = (clientY - rect.top) / rect.height;
      const videos = containerRef.current.querySelectorAll(".hero-video");
      videos.forEach((video, index) => {
        const factor = (index + 1) * 10;
        (video as HTMLElement).style.transform = `translate(${(xPercent - 0.5) * factor}px, ${(yPercent - 0.5) * factor}px)`;
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden" ref={containerRef}>
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
