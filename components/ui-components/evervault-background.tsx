"use client";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function EvervaultBackground({ text = "Evervault" }: { text?: string }) {
  // Track mouse coordinates with Framer Motion.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    setRandomString(generateRandomString(1500));
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    // Regenerate the random string on movement.
    setRandomString(generateRandomString(1500));
  }

  return (
    <div onMouseMove={onMouseMove} className="fixed inset-0 z-[-100]">
      <div className="absolute inset-0">
        <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} text={text} />
      </div>
    </div>
  );
}

function CardPattern({ mouseX, mouseY, randomString, text }: any) {
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      {/* Optional base layer */}
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)]"></div>
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 backdrop-blur-xl transition duration-500"
        style={style}
      />
      {/* Random text overlay for texture */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-500"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
      {/* Optional centered text/logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-44 w-44 rounded-full flex items-center justify-center text-white font-bold text-4xl">
          <div className="absolute w-full h-full bg-white/[0.8] blur-sm rounded-full" />
          <span className="z-20">{text}</span>
        </div>
      </div>
    </div>
  );
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function generateRandomString(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
