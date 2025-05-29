"use client";

import { motion } from "framer-motion";
import { defaultProps } from "../../store/loaderDefaults";
import { BounceLoaderProps } from "../../types/types";

const BounceLoader: React.FC<BounceLoaderProps> = ({
  primaryColor = defaultProps.primaryColor,
  secondaryColor = defaultProps.secondaryColor,
  speed = 0.8,
  dotCount = 3,
  dotSize = 16,
  dotSpacing = 8,
  bounceHeightFactor = 1.5,
}) => {
  const bounceHeight = -(dotSize * bounceHeightFactor);
  const circles = Array.from({ length: dotCount });

  return (
    <div
      style={{
        display: "flex",
        gap: `${dotSpacing}px`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {circles.map((_, i) => (
        <motion.div
          key={i}
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: "50%",
            background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
          }}
          animate={{
            y: [0, bounceHeight, 0],
          }}
          transition={{
            duration: speed,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * (speed / dotCount),
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default BounceLoader;
