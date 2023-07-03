import {createRollupOptions, environment} from '@react-raw/bundler';

import packageJson from './package.json';

import type {RollupOptions} from 'rollup';

const lazyRollupOptions = environment(({isProduction}) => {
  const rollupOptions: RollupOptions = createRollupOptions(packageJson, {
    source: {
      '.': './src/src_alias.ts',
      next: './src/next/next_alias.ts',
    },
    isProduction,
  });

  return rollupOptions;
});

export default lazyRollupOptions;
