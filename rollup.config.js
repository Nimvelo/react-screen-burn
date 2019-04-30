import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import svgr from '@svgr/rollup';

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      exports: 'named',
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      exports: 'named',
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({
      modules: true,
    }),
    svgr(),
    resolve(),
    typescript({
      jsx: 'react',
    }),
    commonjs({
      namedExports: {
        // https://rollupjs.org/guide/en#error-name-is-not-exported-by-module-
        'node_modules/react/index.js': [
          'createElement',
          'Fragment',
          'Component',
        ],
      },
    }),
  ],
};
