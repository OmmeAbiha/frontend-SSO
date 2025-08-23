"use client";

import { motion } from "framer-motion";
import React from "react";
import clsx from "clsx";

type SkeletonProps = {
  className?: string;
  shape?: "rect" | "circle";
  width?: number | string;
  height?: number | string;
  direction?: "right" | "left" | "top" | "bottom" | "diagonal";
  duration?: number;
  baseColor?: string;
  highlightColor?: string;
  layers?: number; // چند wave موازی
};

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  shape = "rect",
  width = "100%",
  height = "1rem",
  direction = "right",
  duration = 1.5,
  baseColor = "bg-gray-200 dark:bg-gray-700",
  highlightColor = "via-white/40",
  layers = 1,
}) => {
  // جهت‌ها
  const directionMap: Record<string, { from: any; to: any; gradient: string }> = {
    right: {
      from: { x: "-100%", y: 0 },
      to: { x: "100%", y: 0 },
      gradient: `bg-gradient-to-r from-transparent ${highlightColor} to-transparent`,
    },
    left: {
      from: { x: "100%", y: 0 },
      to: { x: "-100%", y: 0 },
      gradient: `bg-gradient-to-l from-transparent ${highlightColor} to-transparent`,
    },
    top: {
      from: { x: 0, y: "100%" },
      to: { x: 0, y: "-100%" },
      gradient: `bg-gradient-to-t from-transparent ${highlightColor} to-transparent`,
    },
    bottom: {
      from: { x: 0, y: "-100%" },
      to: { x: 0, y: "100%" },
      gradient: `bg-gradient-to-b from-transparent ${highlightColor} to-transparent`,
    },
    diagonal: {
      from: { x: "-100%", y: "-100%" },
      to: { x: "100%", y: "100%" },
      gradient: `bg-gradient-to-br from-transparent ${highlightColor} to-transparent`,
    },
  };

  const { from, to, gradient } = directionMap[direction];

  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        baseColor,
        shape === "circle" ? "rounded-full" : "rounded-md",
        className
      )}
      style={{ width, height }}
    >
      {Array.from({ length: layers }).map((_, i) => (
        <motion.div
          key={i}
          initial={from}
          animate={to}
          transition={{
            duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: i * (duration / layers), // برای wave موازی
          }}
          className={clsx("absolute inset-0", gradient)}
        />
      ))}
    </div>
  );
};

export default Skeleton;