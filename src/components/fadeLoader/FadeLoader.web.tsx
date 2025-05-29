"use client";

import { motion } from "framer-motion";
import React from "react";
import { defaultProps } from "../../store/loaderDefaults";
import { FadeLoaderProps } from "../../types/types";

const FadeLoader: React.FC<FadeLoaderProps> = ({
  size = defaultProps.size,
  primaryColor = defaultProps.primaryColor,
  secondaryColor = defaultProps.secondaryColor,
  speed = 1.2,
  dotCount = 8,
  dotSize = 12,
  radius = 30,
}) => {
  const dots = Array.from({ length: dotCount });

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      {dots.map((_, i) => {
        const angle = (i / dots.length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              borderRadius: "50%",
              background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
              left: `calc(50% + ${x}px - ${dotSize / 2}px)`,
              top: `calc(50% + ${y}px - ${dotSize / 2}px)`,
            }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: speed,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * (speed / dotCount / 2),
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default FadeLoader;
