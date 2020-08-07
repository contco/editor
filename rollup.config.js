export default {
    input: 'src/main.js',
    output: [
      {
        file: 'esm/index.js',
        format: 'es',
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
    ],
    external (id) {
      return /@babel\/runtime/.test(id);
    },
  }