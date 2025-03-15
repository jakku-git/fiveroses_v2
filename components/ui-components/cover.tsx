"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // ✅ Ensure correct import

export const Cover = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.clientHeight ?? 0;
      const numberOfBeams = Math.floor(height / 6);
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1))
      );
      setBeamPositions(positions);
    }
  }, []); // ✅ Prevent unnecessary re-renders

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      className={cn(
        "relative group inline-block px-4 py-2 transition-all duration-300 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900",
        className
      )}
    >
      {/* ✅ Fast-Moving Beams for True Aceternity Effect */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 h-full w-full overflow-hidden"
        >
          {beamPositions.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 1, 0.2], x: ["-50%", "50%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut",
              }}
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ffffff90] to-transparent opacity-50"
              style={{ top: position }}
            />
          ))}
        </motion.div>
      )}

      {/* ✅ Text Content with Smooth Blend-in Effect */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: hovered ? 0.9 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 text-white font-bold text-xl tracking-wide"
      >
        {children}
      </motion.div>

      {/* ✅ Outer Glow to Make Effect Stand Out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-lg bg-neutral-700 opacity-20 blur-lg"
      />
    </div>
  );
};
