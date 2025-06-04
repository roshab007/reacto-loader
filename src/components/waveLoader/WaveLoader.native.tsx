import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { defaultProps } from "../../store/loaderDefaults";
import { WaveLoaderProps } from "../../types/types";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const WaveLoader: React.FC<WaveLoaderProps> = ({
  primaryColor = defaultProps.primaryColor,
  secondaryColor = defaultProps.secondaryColor,
  speed = 1,
  barCount = 5,
  barWidth = 8,
  barSpacing = 6,
  minHeight = 24,
  maxHeight = 60,
}) => {
  const bars = Array.from({ length: barCount });
  const totalWidth = barWidth * barCount + barSpacing * (barCount - 1);

  return (
    <View style={styles.container}>
      <Svg width={totalWidth} height={maxHeight}>
        <Defs>
          <LinearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={secondaryColor} />
            <Stop offset="1" stopColor={primaryColor} />
          </LinearGradient>
          <LinearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={primaryColor} />
            <Stop offset="1" stopColor={secondaryColor} />
          </LinearGradient>
        </Defs>
        {bars.map((_, index) => (
          <AnimatedBar
            key={index}
            index={index}
            barWidth={barWidth}
            barSpacing={barSpacing}
            minHeight={minHeight}
            maxHeight={maxHeight}
            gradientId={index % 2 === 0 ? "gradient1" : "gradient2"}
            speed={speed}
            barCount={barCount}
          />
        ))}
      </Svg>
    </View>
  );
};
export default WaveLoader;

interface AnimatedBarProps {
  index: number;
  barWidth: number;
  barSpacing: number;
  minHeight: number;
  maxHeight: number;
  gradientId: string;
  speed: number;
  barCount: number;
}

const AnimatedBar: React.FC<AnimatedBarProps> = ({
  barCount,
  barWidth,
  index,
  maxHeight,
  minHeight,
  speed,
  barSpacing,
  gradientId,
}) => {
  const height = useSharedValue(minHeight);
  const x = index * (barWidth + barSpacing);

  useEffect(() => {
    const delay = index * ((speed * 1000) / barCount / 2);

    height.value = withDelay(
      delay,
      withRepeat(
        withTiming(maxHeight, {
          duration: speed * 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    height: height.value,
    y: maxHeight - height.value,
  }));

  return (
    <AnimatedRect
      animatedProps={animatedProps}
      x={x}
      width={barWidth}
      rx={4}
      ry={4}
      fill={`url(#${gradientId})`}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  bar: {
    borderRadius: 4,
  },
});
