"use client";

import { motion } from "framer-motion";
import React, { useId } from "react";
import { defaultProps } from "../../store/loaderDefaults";
import { hexToRgb } from "../../store/utils";
import { CircularLoaderProps } from "../../types/types";

const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = defaultProps.size,
  primaryColor = defaultProps.primaryColor,
  secondaryColor = defaultProps.secondaryColor,
  speed = defaultProps.speed,
  thickness = 8,
  backgroundOpacity = 0.2,
}) => {
  const gradientId = useId();
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg style={{ width: "100%", height: "100%" }} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={`rgba(${hexToRgb(primaryColor)}, ${backgroundOpacity})`}
          strokeWidth={thickness}
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}`, rotate: 0 }}
          animate={{
            strokeDasharray: [
              `0 ${circumference}`,
              `${circumference} 0`,
              `0 ${circumference}`,
            ],
            rotate: 360,
          }}
          transition={{
            duration: speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "center" }}
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CircularLoader;
