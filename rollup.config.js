import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import preserveDirectives from 'rollup-plugin-preserve-directives';

const packageJson = require('./package.json');

export default [
  // Main bundle (ESM)
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser({
        format: {
          comments: false
        }
      }),
      preserveDirectives()
    ],
    external: ['react', 'react-dom']
  },
  
  // Main bundle (CommonJS)
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser({
        format: {
          comments: false
        }
      }),
      preserveDirectives()
    ],
    external: ['react', 'react-dom']
  },
  
  // Browser bundle (UMD)
  {
    input: 'src/browser.ts',
    output: [
      {
        file: 'dist/browser.js',
        format: 'umd',
        name: 'RupiahFormatter',
        sourcemap: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.browser.json' }),
      terser()
    ],
    external: ['react', 'react-dom']
  },
  
  // Type declarations bundle
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external: [/\.css$/]
  }
];