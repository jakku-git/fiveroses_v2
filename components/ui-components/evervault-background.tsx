"use client";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function EvervaultBackground() {
  // Track the mouse coordinates using Framer Motion values.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");

  // Initialize with a random string.
  useEffect(() => {
    setRandomString(generateRandomString(1500));
  }, []);

  // Update motion values and random string on mouse movement.
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setRandomString(generateRandomString(1500));
  };

  // Create a mask image that follows the mouse.
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div onMouseMove={onMouseMove} className="fixed inset-0 z-[-100]">
      <div className="absolute inset-0">
        <CardPattern style={style} randomString={randomString} />
      </div>
    </div>
  );
}

function CardPattern({ style, randomString }: { style: any; randomString: string }) {
  return (
    <div className="pointer-events-none">
      {/* Optional base layer */}
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)]"></div>
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 backdrop-blur-xl transition duration-500"
        style={style}
      />
      {/* Random text overlay for subtle texture */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-500"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
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
