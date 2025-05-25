import React from 'react';
import { motion } from 'framer-motion';

interface LoadingBoxProps {
  color?: string;
  size?: string | number;
}

const LoadingBox: React.FC<LoadingBoxProps> = ({ color = "#262626", size = 60 }) => {
  const dotSize = typeof size === "number" ? size / 5 : 12;
  const gap = typeof size === "number" ? size / 7 : 7;

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: size, minWidth: size }}
    >
      <div style={{ display: "flex", alignItems: "center", gap }}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.1, 1] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
            style={{
              display: "block",
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              background: color,
              margin: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingBox;