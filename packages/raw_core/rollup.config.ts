import {createRollupOptions, environment} from '@react-raw/bundler';

import packageJson from './package.json';

import type {RollupOptions} from 'rollup';

const lazyRollupOptions = environment(({isProduction}) => {
  const rollupOptions: RollupOptions = createRollupOptions(packageJson, {
    sourceDirectory: './src',
    source: {
      '.': './src_alias.ts',
      next: './next/next_alias.ts',
    },
    isProduction,
  });

  return rollupOptions;
});

export default lazyRollupOptions;
