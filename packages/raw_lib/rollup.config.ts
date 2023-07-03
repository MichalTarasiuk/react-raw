import {createRollupOptions, environment} from '@react-raw/bundler';

import packageJson from './package.json';

import type {RollupOptions} from 'rollup';

const lazyRollupOptions = environment(({isProduction}) => {
  const rollupOptions: RollupOptions = createRollupOptions(packageJson, {
    source: {
      composables: './src/composables/composables_alias.ts',
      node: './src/node/node_alias.ts',
      utils: './src/utils/utils_alias.ts',
    },
    isProduction,
  });

  return rollupOptions;
});

export default lazyRollupOptions;
