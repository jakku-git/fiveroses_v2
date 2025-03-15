"use client";

import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/ui-components/sparklescore"; // ✅ Import Sparkles

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
      const numberOfBeams = Math.floor(height / 8);
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1))
      );
      setBeamPositions(positions);
    }
  }, [ref]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      className={cn(
        "relative group inline-block bg-neutral-900 px-2 py-2 transition duration-200 rounded-sm overflow-hidden",
        className
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full overflow-hidden"
          >
            <motion.div
              animate={{ translateX: ["-50%", "0%"] }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              className="absolute inset-0"
            >
              {beamPositions.map((position, index) => (
                <div
                  key={index}
                  className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                  style={{ top: position }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 text-white font-bold">{children}</div>
      {hovered && <SparklesCore />} {/* ✅ Add sparkles when hovered */}
    </div>
  );
};
