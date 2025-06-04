import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import preserveDirectives from "rollup-preserve-directives";

const extensions = [".ts", ".tsx"];
const webExtensions = [".web.ts", ".web.tsx", ...extensions];
const nativeExtensions = [".native.ts", ".native.tsx", ...extensions];

const createConfig = (platform) => ({
  input: `src/index.${platform}.ts`,
  output: [
    ...(platform === "web"
      ? [
          {
            file: `dist/${platform}/cjs/index.js`,
            format: "cjs",
            sourcemap: true,
          },
        ]
      : []),
    {
      file: `dist/${platform}/esm/index.js`,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    preserveDirectives(),
    peerDepsExternal(),
    resolve({
      extensions: platform === "web" ? webExtensions : nativeExtensions,
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    ...(platform === "web" ? [terser()] : []),
  ],
  external: [
    "react",
    "react-dom",
    "react-native",
    "react-native-svg",
    "react-native-reanimated",
  ],
});

export default [
  createConfig("web"),
  createConfig("native"),
  {
    input: "src/index.web.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
