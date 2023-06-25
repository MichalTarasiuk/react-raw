import {createRollupOptions, environment} from '@react-raw/bundler';

import packageJSON from './package.json';

import type {RollupOptions} from 'rollup';

const lazyRollupOptions = environment((configuration) => {
  const rollupOptions: RollupOptions = createRollupOptions(
    packageJSON,
    configuration
  );

  return rollupOptions;
});

export default lazyRollupOptions;
