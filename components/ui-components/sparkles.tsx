"use client";

import React, { useEffect, useState, useId } from "react";
import { useAnimation, motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // ✅ Loads particle effects
import type { Container } from "@tsparticles/engine";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = ({
  id,
  className = "",
  background = "#0d47a1",
  minSize = 1,
  maxSize = 3,
  speed = 4,
  particleColor = "#ffffff",
  particleDensity = 120,
}: ParticlesProps) => {
  const [init, setInit] = useState(false);
  const controls = useAnimation();
  const generatedId = useId();

  // ✅ Initialize Particles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  // ✅ Handle Particle Animation (Fixed to return Promise<void>)
  const particlesLoaded = async (container?: Container): Promise<void> => {
    if (container) {
      await controls.start({ opacity: 1, transition: { duration: 1 } });
    }
  };

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded} // ✅ Fixed function signature
          options={{
            background: { color: { value: background } },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: false, mode: "repulse" },
                resize: { enable: true }, // ✅ Fixed Type Error
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              color: { value: particleColor },
              move: {
                enable: true,
                speed: speed,
                direction: "none",
                outModes: { default: "out" },
              },
              number: {
                value: particleDensity,
                density: { enable: true, width: 400, height: 400 },
              },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                  enable: true,
                  speed: speed,
                  startValue: "random",
                  mode: "auto",
                },
              },
              shape: { type: "circle" },
              size: {
                value: { min: minSize, max: maxSize },
                animation: { enable: false },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};
