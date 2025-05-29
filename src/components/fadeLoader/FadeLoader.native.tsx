import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { defaultProps } from "../../store/loaderDefaults";
import { FadeLoaderProps } from "../../types/types";

const FadeLoader: React.FC<FadeLoaderProps> = ({
  size = defaultProps.size,
  primaryColor = defaultProps.primaryColor,
  secondaryColor = defaultProps.secondaryColor,
  speed = 1.2,
  dotCount = 8,
  dotSize = 12,
  radius = 30,
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {Array.from({ length: dotCount }).map((_, index) => (
        <FadeDot
          key={index}
          index={index}
          dotCount={dotCount}
          dotSize={dotSize}
          radius={radius}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          speed={speed}
        />
      ))}
    </View>
  );
};

export default FadeLoader;

interface FadeDotProps {
  index: number;
  dotCount: number;
  dotSize: number;
  radius: number;
  primaryColor: string;
  secondaryColor: string;
  speed: number;
}

const FadeDot: React.FC<FadeDotProps> = ({
  index,
  dotCount,
  dotSize,
  radius,
  primaryColor,
  secondaryColor,
  speed,
}) => {
  const opacity = useSharedValue(0);

  const angle = (index / dotCount) * 2 * Math.PI;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  useEffect(() => {
    const delay = index * ((speed * 1000) / dotCount / 2);

    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(
          1,
          {
            duration: speed * 500,
            easing: Easing.inOut(Easing.ease),
          },
          () => {
            return withTiming(0, {
              duration: speed * 500,
              easing: Easing.inOut(Easing.ease),
            });
          }
        ),
        -1,
        false
      )
    );
  }, [index, speed, dotCount]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.dotContainer,
        {
          width: dotSize,
          height: dotSize,
          left: `50%`,
          top: `50%`,
          transform: [
            { translateX: x },
            { translateY: y },
            { translateX: -dotSize / 2 },
            { translateY: -dotSize / 2 },
          ],
        },
        animatedStyle,
      ]}
    >
      <Svg width={dotSize} height={dotSize}>
        <Defs>
          <LinearGradient id={`grad-${index}`} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={primaryColor} stopOpacity="1" />
            <Stop offset="1" stopColor={secondaryColor} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={dotSize / 2}
          cy={dotSize / 2}
          r={dotSize / 2}
          fill={`url(#grad-${index})`}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  dotContainer: {
    position: "absolute",
  },
});
