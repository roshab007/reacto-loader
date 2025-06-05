import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { defaultProps } from "../../store/loaderDefaults";
import { MatrixLoaderProps } from "../../types/types";

const MatrixLoader: React.FC<MatrixLoaderProps> = ({
  size = defaultProps.size,
  color = defaultProps.primaryColor,
  speed = defaultProps.speed,
  columns = 6,
  characters = "01",
  dropSpeed = 2,
}) => {
  const [drops, setDrops] = useState<
    Array<{ id: number; char: string; delay: number }>
  >([]);

  useEffect(() => {
    const newDrops = Array.from({ length: columns * 8 }).map((_, i) => ({
      id: i,
      char: characters[Math.floor(Math.random() * characters.length)],
      delay: Math.random() * 2,
    }));
    setDrops(newDrops);
  }, [columns, characters]);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {drops.map((drop, i) => (
        <motion.div
          key={drop.id}
          style={{
            left: `${(i % columns) * (100 / columns)}%`,
            color: color,
            textShadow: `0 0 5px ${color}`,
            fontWeight: "bold",
            position: "absolute",
            fontSize: 12,
          }}
          animate={{
            y: [-20, size + 20],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: dropSpeed / speed,
            repeat: Number.POSITIVE_INFINITY,
            delay: drop.delay,
            ease: "linear",
          }}
        >
          {drop.char}
        </motion.div>
      ))}
    </div>
  );
};

export default MatrixLoader;
