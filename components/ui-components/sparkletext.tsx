"use client";

import React from "react";
import { motion } from "framer-motion";

export const SparkleText = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="relative inline-block">
      {/* Sparkles */}
      <motion.span
        className="absolute inset-0 opacity-80 mix-blend-lighten pointer-events-none"
        animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      >
        ✨
      </motion.span>

      {/* Text */}
      <span className="relative">{children}</span>
    </span>
  );
};
