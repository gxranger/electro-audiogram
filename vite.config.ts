import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  build: {
    target: 'es2015',
    minify: true,
    lib: {
      entry: 'src/index.ts',
      name: 'ElectroAudiogram',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
    })
  ],
});