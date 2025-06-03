export interface BaseLoaderProps {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  speed?: number;
}

export interface CircularLoaderProps extends BaseLoaderProps {
  thickness?: number;
  backgroundOpacity?: number;
}

export interface BounceLoaderProps extends Omit<BaseLoaderProps, "size"> {
  dotCount?: number;
  dotSize?: number;
  dotSpacing?: number;
  bounceHeightFactor?: number;
}
export interface DotsLoaderProps extends Omit<BaseLoaderProps, "size"> {
  dotCount?: number;
  dotSize?: number;
  dotSpacing?: number;
  scaleRange?: [number, number, number];
}

export interface FadeLoaderProps extends BaseLoaderProps {
  dotCount?: number;
  dotSize?: number;
  radius?: number;
}

export interface GridLoaderProps extends Omit<BaseLoaderProps, "size"> {
  gridSize?: number;
  squareSize?: number;
  gap?: number;
}
