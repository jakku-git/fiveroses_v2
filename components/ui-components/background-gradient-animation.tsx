"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionTemplate } from "framer-motion";

interface MousePos {
  x: number;
  y: number;
}

interface BackgroundGradientAnimationProps {
  mousePos: MousePos;
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const BackgroundGradientAnimation = ({
  mousePos,
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "300px",
  blendingValue = "hard-light",
  children,
  className,
  containerClassName,
}: BackgroundGradientAnimationProps) => {
  // Set CSS variables for the gradient colors.
  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  // Create spring motion values from the mousePos.
  const motionX = useSpring(mousePos.x, { stiffness: 100, damping: 20 });
  const motionY = useSpring(mousePos.y, { stiffness: 100, damping: 20 });

  // Update the springs when mousePos changes.
  useEffect(() => {
    motionX.set(mousePos.x);
    motionY.set(mousePos.y);
  }, [mousePos.x, mousePos.y, motionX, motionY]);

  // Combine translation with -50% offset so that the circle's center follows the cursor.
  const transform = useMotionTemplate`translate(${motionX}px, ${motionY}px) translate(-50%, -50%)`;

  // Use a ref for potential future use.
  const interactiveRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("relative overflow-hidden pointer-events-none", containerClassName)} ref={interactiveRef}>
      <div className={cn("", className)}>{children}</div>
      {/* This motion.div now is a circle that follows the mouse */}
      <motion.div
        className={cn("absolute rounded-full overflow-hidden gradients-container blur-2xl animate-hue", "[filter:url(#blurMe)_blur(40px)]")}
        style={{ width: size, height: size, transform }}
      >
        <svg className="hidden">
          <defs>
            <filter id="blurMe">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div
          className={cn(
            "absolute",
            "[background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)]",
            "w-[var(--size)] h-[var(--size)]",
            "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:center_center]",
            "animate-first",
            "opacity-100"
          )}
        ></div>
        <div
          className={cn(
            "absolute",
            "[background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)]",
            "w-[var(--size)] h-[var(--size)]",
            "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-400px)]",
            "animate-second",
            "opacity-100"
          )}
        ></div>
        <div
          className={cn(
            "absolute",
            "[background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)]",
            "w-[var(--size)] h-[var(--size)]",
            "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%+400px)]",
            "animate-third",
            "opacity-100"
          )}
        ></div>
        <div
          className={cn(
            "absolute",
            "[background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)]",
            "w-[var(--size)] h-[var(--size)]",
            "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-200px)]",
            "animate-fourth",
            "opacity-70"
          )}
        ></div>
        <div
          className={cn(
            "absolute",
            "[background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)]",
            "w-[var(--size)] h-[var(--size)]",
            "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-800px)_calc(50%+800px)]",
            "animate-fifth",
            "opacity-100"
          )}
        ></div>
      </motion.div>
    </div>
  );
};

export default BackgroundGradientAnimation;
