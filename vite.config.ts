import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'socialite',
      fileName: (format) => `socialite.${format}.js`,
    },
    minify: false,
  },
  plugins: [dts({rollupTypes: true})],
  test: {
    setupFiles: 'config/tests-setup',
  },
});
