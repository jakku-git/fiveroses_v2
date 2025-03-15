"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui-components/background-gradient";
import { TextGenerateEffect } from "@/components/ui-components/text-generate-effect";
import { TextHoverEffect } from "@/components/ui-components/text-hover-effect";

export const BackgroundBoxes = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rows = 20;
  const cols = 20;

  const generateRandomColor = () => {
    const colors = [
      "#FFC8DD", "#D8BFD8", "#A2D2FF", "#FFAFCC", "#BDB2FF",
      "#FFB3C6", "#A0C4FF", "#CDB4DB", "#E7C6FF", "#B5EAD7"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="h-[40rem] relative overflow-hidden flex items-center justify-center rounded-lg">
      {/* ✅ Add the animated background behind the boxes */}
      <BackgroundGradient />

      {mounted && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 0,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            return (
              <motion.div
                key={i}
                className="bg-white/[0.02] border border-white/[0.07] relative"
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

      <div className="relative z-20 text-center px-6">
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
