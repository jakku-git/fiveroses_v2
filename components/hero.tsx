"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.2),
        repeat: Infinity,
        repeatDelay: 0.3, // Pause for a tiny moment before looping again
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
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
        <TextGenerateEffect words="BRING YOUR IDEAS ALIVE" className="text-5xl md:text-7xl lg:text-8xl" />
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
