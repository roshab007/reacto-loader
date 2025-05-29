# reacto-loader

A sleek, high-performance Loader component designed for seamless integration into both React and React Native/Expo applications.
Offers rich customization options, fluid animations, and full cross-platform compatibility — perfect for modern apps that demand style and speed.

## Installation

### Using npm:

```sh
npm install reacto-loader
```

### Using Yarn:

```sh
yarn add reacto-loader
```

> **Note for React Native / Expo Users:**
> To use `reacto-loader` in React Native or Expo environments, make sure you also install these required peer dependencies:

- [`react-native-svg`](https://www.npmjs.com/package/react-native-svg)
- [`react-native-reanimated`](https://www.npmjs.com/package/react-native-reanimated)

Follow the installation steps in their documentation to ensure proper linking and setup

## Circular Loader

![CircularLoader Example](https://raw.githubusercontent.com/roshab007/reacto-loader/refs/heads/main/gifs/circular_loader.gif)

| Prop                | Type     | Default   | Description                                       |
| ------------------- | -------- | --------- | ------------------------------------------------- |
| `size`              | `number` | `40`      | Diameter of the loader in pixels                  |
| `primaryColor`      | `string` | `#3B82F6` | Start color of the animated gradient stroke       |
| `secondaryColor`    | `string` | `#93C5FD` | End color of the animated gradient stroke         |
| `speed`             | `number` | `1.5`     | Duration (in seconds) for one full animation loop |
| `thickness`         | `number` | `8`       | Stroke width of the loader circle                 |
| `backgroundOpacity` | `number` | `0.2`     | Opacity of the background circle                  |

<br>

## Bounce Loader

![BounceLoader Example](https://raw.githubusercontent.com/roshab007/reacto-loader/refs/heads/main/gifs/bounce_loader.gif)

| Prop                 | Type     | Default   | Description                                                    |
| -------------------- | -------- | --------- | -------------------------------------------------------------- |
| `primaryColor`       | `string` | `#3B82F6` | Start color of the animated gradient on the dots               |
| `secondaryColor`     | `string` | `#93C5FD` | End color of the animated gradient on the dots                 |
| `speed`              | `number` | `0.8`     | Duration (in seconds) of one full bounce animation             |
| `dotCount`           | `number` | `3`       | Number of bouncing dots                                        |
| `dotSize`            | `number` | `16`      | Diameter of each dot in pixels                                 |
| `dotSpacing`         | `number` | `8`       | Spacing (gap) between dots in pixels                           |
| `bounceHeightFactor` | `number` | `1.5`     | Multiplier for how high the dots bounce relative to their size |

<br>

## Dots Loader

![DotsLoader Example](https://raw.githubusercontent.com/roshab007/reacto-loader/refs/heads/main/gifs/dots_loader.gif)

### Props

| Prop             | Type                       | Default       | Description                                 |
| ---------------- | -------------------------- | ------------- | ------------------------------------------- |
| `primaryColor`   | `string`                   | `#3B82F6`     | Start color of the dot gradient             |
| `secondaryColor` | `string`                   | `#93C5FD`     | End color of the dot gradient               |
| `speed`          | `number`                   | `1`           | Controls animation speed (higher = slower)  |
| `dotCount`       | `number`                   | `3`           | Number of dots                              |
| `dotSize`        | `number`                   | `16`          | Diameter of each dot in pixels              |
| `dotSpacing`     | `number`                   | `8`           | Horizontal spacing between dots             |
| `scaleRange`     | `[number, number, number]` | `[1, 1.5, 1]` | Defines keyframes for scale animation cycle |

<br>

## 📄 License

MIT
