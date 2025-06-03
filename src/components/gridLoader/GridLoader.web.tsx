"use client";

import { motion } from "framer-motion";
import { defaultProps } from "../../store/loaderDefaults";
import { GridLoaderProps } from "../../types/types";

const GridLoader: React.FC<GridLoaderProps> = ({
  primaryColor = defaultProps.primaryColor,
  secondaryColor = defaultProps.secondaryColor,
  speed = 1.2,
  gridSize = 3,
  squareSize = 12,
  gap = 4,
}) => {
  const squares = Array.from({ length: gridSize * gridSize });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {squares.map((_, i) => {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          const delay = (row + col) * 0.1;

          return (
            <motion.div
              key={i}
              style={{
                width: `${squareSize}px`,
                height: `${squareSize}px`,
                background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
                borderRadius: "2px",
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: speed,
                repeat: Number.POSITIVE_INFINITY,
                delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GridLoader;
