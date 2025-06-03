import { useEffect } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  AnimatedStyle,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
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
  const totalWidth = gridSize * squareSize + (gridSize - 1) * gap;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.grid,
          {
            width: totalWidth,
            height: totalWidth,
          },
        ]}
      >
        {squares.map((_, i) => {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          const delay = (row + col) * 0.1;

          return (
            <AnimatedSquare
              key={i}
              size={squareSize}
              speed={speed}
              delay={delay}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              style={{
                position: "absolute",
                left: col * (squareSize + gap),
                top: row * (squareSize + gap),
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default GridLoader;

interface AnimatedSquareProps {
  size: number;
  speed: number;
  delay: number;
  primaryColor: string;
  secondaryColor: string;
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

const AnimatedSquare: React.FC<AnimatedSquareProps> = ({
  size,
  speed,
  delay,
  primaryColor,
  secondaryColor,
  style,
}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay * 1000,
      withRepeat(
        withTiming(1, {
          duration: speed * 500,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );

    opacity.value = withDelay(
      delay * 1000,
      withRepeat(
        withTiming(1, {
          duration: speed * 500,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );
  }, [delay, speed]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={primaryColor} stopOpacity="1" />
            <Stop offset="1" stopColor={secondaryColor} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={size} height={size} rx="2" fill="url(#grad)" />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    position: "relative",
  },
});
