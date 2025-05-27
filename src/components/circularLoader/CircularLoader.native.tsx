import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { defaultProps } from "../../store/loaderDefaults";
import { hexToRgba } from "../../store/utils";
import { CircularLoaderProps } from "../../types/types";

// Register animated components
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = defaultProps.size,
  primaryColor = defaultProps.primaryColor,
  secondaryColor = defaultProps.secondaryColor,
  speed = defaultProps.speed,
  thickness = 8,
  backgroundOpacity = 0.2,
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  // Animation values
  const rotation = useSharedValue(0);
  const dashoffset = useSharedValue(circumference);

  // Setup animations
  useEffect(() => {
    // Rotation animation
    rotation.value = withRepeat(
      withTiming(360, {
        duration: speed * 1000,
        easing: Easing.linear,
      }),
      -1, // Infinite repeats
      false // No reverse
    );

    // Dash animation sequence
    dashoffset.value = withRepeat(
      withSequence(
        withTiming(0, {
          duration: (speed * 1000) / 2,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(circumference, {
          duration: (speed * 1000) / 2,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1, // Infinite repeats
      false // No reverse
    );
  }, [speed, circumference]);

  // Animated props for the stroke circle
  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: dashoffset.value,
    };
  });

  // Animated style for rotation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // Convert hex to rgba for background circle
  const bgColor = hexToRgba(primaryColor, backgroundOpacity);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[styles.svgContainer, animatedStyle]}>
        <Svg width="100%" height="100%" viewBox="0 0 100 100">
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={primaryColor} />
              <Stop offset="100%" stopColor={secondaryColor} />
            </LinearGradient>
          </Defs>

          {/* Background circle */}
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke={bgColor}
            strokeWidth={thickness}
            fill="none"
          />

          {/* Animated foreground circle */}
          <AnimatedCircle
            cx="50"
            cy="50"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={thickness}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            animatedProps={animatedCircleProps}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  svgContainer: {
    width: "100%",
    height: "100%",
  },
});

export default CircularLoader;
