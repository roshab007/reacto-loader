import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
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
  const animatedValues = useRef<{ [key: number]: Animated.Value }>({});
  const opacityValues = useRef<{ [key: number]: Animated.Value }>({});

  useEffect(() => {
    // Create initial drops
    const newDrops = Array.from({ length: columns * 8 }).map((_, i) => ({
      id: i,
      char: characters[Math.floor(Math.random() * characters.length)],
      delay: Math.random() * 2,
    }));

    setDrops(newDrops);

    // Initialize animated values
    newDrops.forEach((drop) => {
      animatedValues.current[drop.id] = new Animated.Value(-20);
      opacityValues.current[drop.id] = new Animated.Value(0);
    });

    // Start animations for each drop
    newDrops.forEach((drop) => {
      startAnimation(drop.id, drop.delay);
    });

    return () => {
      // Cleanup animations if needed
      Object.values(animatedValues.current).forEach((value) => {
        value.stopAnimation();
      });
      Object.values(opacityValues.current).forEach((value) => {
        value.stopAnimation();
      });
    };
  }, [columns, characters, size, dropSpeed, speed]);

  const startAnimation = (id: number, delay: number) => {
    // Reset values
    animatedValues.current[id].setValue(-20);
    opacityValues.current[id].setValue(0);

    // Animation for vertical movement
    Animated.timing(animatedValues.current[id], {
      toValue: size + 20,
      duration: (dropSpeed * 1000) / speed,
      delay: delay * 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Restart animation when complete
      // Update character before restarting
      setDrops((prev) =>
        prev.map((drop) =>
          drop.id === id
            ? {
                ...drop,
                char: characters[Math.floor(Math.random() * characters.length)],
              }
            : drop
        )
      );
      startAnimation(id, Math.random() * 2);
    });

    // Animation for opacity
    Animated.sequence([
      Animated.timing(opacityValues.current[id], {
        toValue: 1,
        duration: 200,
        delay: delay * 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValues.current[id], {
        toValue: 1,
        duration: (dropSpeed * 1000) / speed - 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValues.current[id], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const containerStyle = {
    width: size,
    height: size,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {drops.map((drop, i) => (
        <Animated.View
          key={drop.id}
          style={[
            styles.characterContainer,
            {
              left: `${(i % columns) * (100 / columns)}%`,
              transform: [{ translateY: animatedValues.current[drop.id] || 0 }],
              opacity: opacityValues.current[drop.id] || 0,
            },
          ]}
        >
          <Text
            style={[
              styles.character,
              {
                color: color,
                textShadowColor: color,
              },
            ]}
          >
            {drop.char}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  characterContainer: {
    position: "absolute",
  },
  character: {
    fontSize: 12,
    fontWeight: "bold",
    textShadowRadius: 5,
    textShadowOffset: { width: 0, height: 0 },
  },
});

export default MatrixLoader;
