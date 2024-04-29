import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'socialite',
      fileName: (format) => `socialite.${format}.js`,
    },
    rollupOptions: {
      // We might need to define global variables
      // to use in the UMD build.
      external: Object.keys(pkg.peerDependencies),
    },
    minify: false,
  },
  plugins: [dts({rollupTypes: true})],
  test: {
    setupFiles: 'config/tests-setup',
  },
});
