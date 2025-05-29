import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
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
    <View style={[styles.container, { gap: dotSpacing }]}>
      {dots.map((_, i) => (
        <AnimatedDot
          key={i}
          dotSize={dotSize}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          speed={speed}
          scaleRange={scaleRange}
          index={i}
          dotCount={dotCount}
        />
      ))}
    </View>
  );
};

export default DotsLoader;

interface AnimatedDotProps {
  dotSize: number;
  primaryColor: string;
  secondaryColor: string;
  speed: number;
  scaleRange: [number, number, number];
  index: number;
  dotCount: number;
}

const AnimatedDot: React.FC<AnimatedDotProps> = ({
  dotSize,
  primaryColor,
  secondaryColor,
  speed,
  scaleRange,
  index,
  dotCount,
}) => {
  const scale = useSharedValue(scaleRange[0]);
  const opacity = useSharedValue(0.7);

  const duration = 1000 / speed;
  const delay = index * (duration / dotCount / 2);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(scaleRange[1], {
            duration: duration / 2,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(scaleRange[2], {
            duration: duration / 2,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        true
      )
    );

    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, {
            duration: duration / 2,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0.7, {
            duration: duration / 2,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        true
      )
    );
  }, [scale, opacity, delay, duration, scaleRange]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const gradientId = `gradient-${index}`;
  const radius = dotSize / 2;

  return (
    <Animated.View style={animatedStyle}>
      <Svg width={dotSize} height={dotSize}>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={primaryColor} />
            <Stop offset="100%" stopColor={secondaryColor} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          fill={`url(#${gradientId})`}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
