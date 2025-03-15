"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export const BackgroundGradient = ({ className }: { className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

  const translateX = useTransform(smoothX, [-100, 100], ["-10%", "10%"]);
  const translateY = useTransform(smoothY, [-100, 100], ["-10%", "10%"]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPos = (event.clientX / innerWidth) * 200 - 100;
      const yPos = (event.clientY / innerHeight) * 200 - 100;
      x.set(xPos);
      y.set(yPos);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      className={cn(
        "absolute inset-0 -z-20 bg-gradient-to-r from-[#FFC8DD] via-[#D8BFD8] to-[#A2D2FF] animate-gradient",
        className
      )}
      style={{
        backgroundSize: "200% 200%",
        transform: `translate(${translateX}, ${translateY})`,
      }}
    />
  );
};
