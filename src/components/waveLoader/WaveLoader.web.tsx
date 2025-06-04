"use client";

import { motion } from "framer-motion";
import { defaultProps } from "../../store/loaderDefaults";
import { WaveLoaderProps } from "../../types/types";

const WaveLoader: React.FC<WaveLoaderProps> = ({
  primaryColor = defaultProps.primaryColor,
  secondaryColor = defaultProps.secondaryColor,
  speed = 1,
  barCount = 5,
  barWidth = 8,
  barSpacing = 6,
  minHeight = 24,
  maxHeight = 60,
}) => {
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div
      style={{
        height: `${maxHeight}px`,
        display: "flex",
        alignItems: "end",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          gap: `${barSpacing}px`,
          display: "flex",
          alignItems: "end",
        }}
      >
        {bars.map((i) => (
          <motion.div
            key={i}
            initial={{ height: `${minHeight}px` }}
            animate={{
              height: [`${minHeight}px`, `${maxHeight}px`, `${minHeight}px`],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              delay: i * (speed / barCount / 2),
              ease: "easeInOut",
            }}
            style={{
              width: `${barWidth}px`,
              background: `linear-gradient(to top, ${primaryColor}, ${secondaryColor})`,
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaveLoader;
