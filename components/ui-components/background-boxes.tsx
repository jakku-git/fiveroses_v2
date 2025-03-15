"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui-components/text-generate-effect";
import { TextHoverEffect } from "@/components/ui-components/text-hover-effect";
import { EvervaultBackground } from "@/components/ui/evervault-background";

export const BackgroundBoxes = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rows = 20;
  const cols = 20;

  const generateRandomColor = () => {
    const colors = ["#FF5F6D", "#FFC371", "#FF9A8B", "#FF6A88", "#FF99AC"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="h-[40rem] relative overflow-hidden flex items-center justify-center rounded-lg">
      {/* Evervault dynamic background layer */}
      <EvervaultBackground className="z-0" />

      {/* Black overlay for the grid boxes */}
      <div className="absolute inset-0 bg-black z-10" />

      {mounted && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 20,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            return (
              <motion.div
                key={i}
                className="bg-white/[0.01] border border-white/[0.05] relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: (row + col) * 0.1 }}
                whileHover={{
                  backgroundColor: generateRandomColor(),
                  opacity: 0.8,
                  transition: { duration: 0 },
                }}
              />
            );
          })}
        </div>
      )}

      {/* Content text on top */}
      <div className="relative z-30 text-center px-6">
        <TextHoverEffect
          text="fiveroses"
          className="text-6xl md:text-8xl font-bold mb-6 text-white"
        />
        <TextGenerateEffect
          words="a creative digital agency focused on growing brands through strategic and innovative marketing solutions."
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
        />
      </div>
    </div>
  );
};
