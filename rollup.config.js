import typescript from '@rollup/plugin-typescript';

export default [
  // Common js and ES module builds
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/base-js-tools.js',
      format: 'umd',
      name: "baseJsTools",
      globals: {
        immer: "produce"
      }
    },
    plugins: [typescript()],
    external: ["immer"],
  }
]