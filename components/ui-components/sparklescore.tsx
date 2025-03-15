"use client";

import { useCallback } from "react";
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";

export const SparklesCore = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 50 }, // More sparkles!
          color: { value: "#FFB6C1" }, // Soft pastel red sparkles
          shape: { type: "circle" },
          opacity: { value: 0.6, random: true },
          size: { value: 2, random: true },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
