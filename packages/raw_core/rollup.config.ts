import {createRollupOptions, environment} from '@react-raw/bundler';

import packageJson from './package.json';

import type {RollupOptions} from 'rollup';

const lazyRollupOptions = environment(({isProduction}): RollupOptions => {
  return createRollupOptions(packageJson, {
    sourceDirectory: './src',
    source: {
      '.': './src_alias.ts',
    },
    isProduction,
  });
});

export default lazyRollupOptions;
