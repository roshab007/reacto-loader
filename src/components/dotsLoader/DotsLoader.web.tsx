"use client";

import { motion } from "framer-motion";
import React from "react";
import { defaultProps } from "../../store/loaderDefaults";
import { DotsLoaderProps } from "../../types/types";

const DotsLoader: React.FC<DotsLoaderProps> = ({
  primaryColor = defaultProps.primaryColor,
  secondaryColor = defaultProps.secondaryColor,
  speed = 1,
  dotCount = 3,
  dotSize = 16,
  dotSpacing = 8,
  scaleRange = [1, 1.5, 1],
}) => {
  const dots = Array.from({ length: dotCount });

  return (
    <div
      style={{
        gap: `${dotSpacing}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {dots.map((_, i) => (
        <motion.div
          key={i}
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: "50%",
            background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
          }}
          animate={{
            scale: scaleRange,
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: speed,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * (speed / dotCount / 2),
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default DotsLoader;
