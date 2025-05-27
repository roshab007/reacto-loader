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

## Usage

### React

```tsx
import React from "react";
import { CircularLoader } from "reacto-loader";

function App() {
  return (
    <div>
      <CircularLoader
        size={120}
        primaryColor="#4F46E5"
        secondaryColor="#3B82F6"
        speed={1.8}
        thickness={10}
        backgroundOpacity={0.15}
      />
    </div>
  );
}

export default App;
```

### React Native / Expo

```tsx
import React from "react";
import { View } from "react-native";
import { CircularLoader } from "reacto-loader";

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CircularLoader
        size={120}
        primaryColor="#4F46E5"
        secondaryColor="#3B82F6"
        speed={1.8}
        thickness={10}
        backgroundOpacity={0.15}
      />
    </View>
  );
}
```

## Props

| Prop                | Type     | Default   | Description                                       |
| ------------------- | -------- | --------- | ------------------------------------------------- |
| `size`              | `number` | `40`      | Diameter of the loader in pixels                  |
| `primaryColor`      | `string` | `#3B82F6` | Start color of the animated gradient stroke       |
| `secondaryColor`    | `string` | `#93C5FD` | End color of the animated gradient stroke         |
| `speed`             | `number` | `1.5`     | Duration (in seconds) for one full animation loop |
| `thickness`         | `number` | `8`       | Stroke width of the loader circle                 |
| `backgroundOpacity` | `number` | `0.2`     | Opacity of the background circle                  |

## 📄 License

MIT
