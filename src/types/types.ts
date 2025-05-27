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
