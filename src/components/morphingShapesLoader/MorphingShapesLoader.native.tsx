import React, { useEffect } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
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
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: (morphDuration * 1000) / speed,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    rotation.value = withRepeat(
      withTiming(360, {
        duration: (morphDuration * 1000) / speed,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [morphDuration, speed]);

  const animatedShapeStyle = useAnimatedStyle(() => {
    const borderTopLeftRadius = interpolate(
      progress.value,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      [0, 50, 0, 50, 50, 0]
    );

    const borderTopRightRadius = interpolate(
      progress.value,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      [0, 50, 50, 0, 50, 0]
    );

    const borderBottomLeftRadius = interpolate(
      progress.value,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      [0, 50, 50, 50, 50, 0]
    );

    const borderBottomRightRadius = interpolate(
      progress.value,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      [0, 50, 50, 50, 50, 0]
    );

    const scale = interpolate(
      progress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [1, 1.2, 1, 1.2, 1]
    );

    return {
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      transform: [{ rotate: `${rotation.value}deg` }, { scale }],
      shadowColor: primaryColor,
      shadowOpacity: 0.5,
      shadowRadius: glowIntensity,
      shadowOffset: { width: 0, height: 0 },
      elevation: 5,
    };
  });

  const createOrbitingDotStyle = (index: number): ViewStyle => {
    const angle = (index * 120 + 360) * (Math.PI / 180);
    const orbitRadius = shapeSize / 2 + 15;

    return {
      transform: [
        { translateX: Math.cos(angle) * orbitRadius },
        { translateY: Math.sin(angle) * orbitRadius },
      ],
    };
  };

  const orbitingDotStyles = [0, 1, 2].map((i) => createOrbitingDotStyle(i));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[animatedShapeStyle, styles.shapeContainer]}>
        <Svg width={shapeSize} height={shapeSize}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={primaryColor} stopOpacity="1" />
              <Stop offset="1" stopColor={secondaryColor} stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect width={shapeSize} height={shapeSize} fill="url(#grad)" />
        </Svg>
      </Animated.View>

      {[0, 1, 2].map((i) => (
        <Animated.View
          key={i}
          style={[
            styles.orbitingDot,
            {
              backgroundColor: i % 2 === 0 ? primaryColor : secondaryColor,
              shadowColor: i % 2 === 0 ? primaryColor : secondaryColor,
              shadowOpacity: 0.5,
              shadowRadius: glowIntensity / 2,
            },
            orbitingDotStyles[i],
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  shapeContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  orbitingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: "absolute",
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
});

export default MorphingShapesLoader;
