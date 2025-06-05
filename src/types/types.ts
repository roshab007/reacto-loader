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

export interface WaveLoaderProps extends Omit<BaseLoaderProps, "size"> {
  barCount?: number;
  barWidth?: number;
  barSpacing?: number;
  minHeight?: number;
  maxHeight?: number;
}

export interface MorphingShapesLoaderProps extends BaseLoaderProps {
  shapeSize?: number;
  morphDuration?: number;
  glowIntensity?: number;
}

export interface MatrixLoaderProps
  extends Omit<BaseLoaderProps, "primaryColor" | "secondaryColor"> {
  columns?: number;
  characters?: string;
  dropSpeed?: number;
  color?: string;
}
