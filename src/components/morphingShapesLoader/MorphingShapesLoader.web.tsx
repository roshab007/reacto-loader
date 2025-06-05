"use client";

import { motion } from "framer-motion";
import { defaultProps } from "../../store/loaderDefaults";
import { MorphingShapesLoaderProps } from "../../types/types";

const MorphingShapesLoader: React.FC<MorphingShapesLoaderProps> = ({
  size = defaultProps.size,
  primaryColor = defaultProps.primaryColor,
  secondaryColor = defaultProps.secondaryColor,
  speed = defaultProps.speed,
  shapeSize = 40,
  morphDuration = 2,
  glowIntensity = 8,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        style={{
          width: `${shapeSize}px`,
          height: `${shapeSize}px`,
          background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
          boxShadow: `0 0 ${glowIntensity * 2}px ${primaryColor}80, 0 0 ${
            glowIntensity * 4
          }px ${secondaryColor}40`,
        }}
        animate={{
          borderRadius: [
            "0%", // Square
            "50%", // Circle
            "0% 50% 50% 50%", // Teardrop
            "50% 0% 50% 50%", // Different teardrop
            "50%", // Circle again
            "0%", // Back to square
          ],
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.2, 1, 1.2, 1],
        }}
        transition={{
          duration: morphDuration / speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Orbiting dots */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: "8px",
            height: "8px",
            position: "absolute",
            borderRadius: 99999,
            background: i % 2 === 0 ? primaryColor : secondaryColor,
            boxShadow: `0 0 ${glowIntensity}px ${
              i % 2 === 0 ? primaryColor : secondaryColor
            }`,
          }}
          animate={{
            x: [
              Math.cos((i * 120 * Math.PI) / 180) * (shapeSize / 2 + 15),
              Math.cos(((i * 120 + 360) * Math.PI) / 180) *
                (shapeSize / 2 + 15),
            ],
            y: [
              Math.sin((i * 120 * Math.PI) / 180) * (shapeSize / 2 + 15),
              Math.sin(((i * 120 + 360) * Math.PI) / 180) *
                (shapeSize / 2 + 15),
            ],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: (morphDuration * 1.5) / speed,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default MorphingShapesLoader;
