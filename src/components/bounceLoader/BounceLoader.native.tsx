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

  return (
    <View style={[styles.container, { gap: dotSpacing }]}>
      {Array.from({ length: dotCount }).map((_, i) => (
        <BouncingDot
          key={i}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          size={dotSize}
          speed={speed}
          bounceHeight={bounceHeight}
          delay={i * (speed / dotCount)}
        />
      ))}
    </View>
  );
};

export default BounceLoader;

interface BouncingDotProps {
  primaryColor: string;
  secondaryColor: string;
  size: number;
  speed: number;
  bounceHeight: number;
  delay: number;
}

const BouncingDot: React.FC<BouncingDotProps> = ({
  primaryColor,
  secondaryColor,
  size,
  speed,
  bounceHeight,
  delay,
}) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay * 1000,
      withRepeat(
        withSequence(
          withTiming(bounceHeight, {
            duration: (speed * 1000) / 2,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, {
            duration: (speed * 1000) / 2,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1, // Infinite repeat
        false
      )
    );
  }, [bounceHeight, delay, speed]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor={primaryColor} />
            <Stop offset="100%" stopColor={secondaryColor} />
          </LinearGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#grad)" />
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
