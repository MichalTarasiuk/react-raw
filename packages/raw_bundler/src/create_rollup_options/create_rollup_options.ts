import commonJSRollupPlugin from '@rollup/plugin-commonjs';
import nodeResolveRollupPlugin from '@rollup/plugin-node-resolve';
import terserRollupPlugin from '@rollup/plugin-terser';
import typescriptRollupPlugin from '@rollup/plugin-typescript';
import {getTsconfig} from 'get-tsconfig';
import {join} from 'node:path';
import peerDeepsExternalRollupPlugin from 'rollup-plugin-peer-deps-external';

import {
  DEFAULT_TSCONFIG_JSON_PATH,
  supportedImportNames,
} from './constants/constants_alias';
import {
  formatToExtension,
  importNameToFormat,
  readPackageJSON,
} from './helpers/helpers_alias';
import {dtsRollupPlugin} from './plugins/plugins_alias';

import type {InputPluginOption, RollupOptions} from 'rollup';
import type {JsonObject} from 'type-fest';

type Options = {
  readonly tsconfigJSONPath?: string;
  readonly isProduction: boolean;
};

export const createRollupOptions = (
  jsonObject: JsonObject,
  {isProduction, tsconfigJSONPath = DEFAULT_TSCONFIG_JSON_PATH}: Options
) => {
  const packageJSON = readPackageJSON(jsonObject);

  if (!packageJSON) {
    throw Error('`packageJSON should contain `root` and `distDir` props');
  }

  const {root, distDir, source, typeVersions} = packageJSON;
  const tsConfig = getTsconfig(tsconfigJSONPath)?.config ?? {};

  const input: RollupOptions['input'] = Object.fromEntries(
    Object.entries(source).map(
      ([sourceName, sourceValue]) =>
        [sourceName, join(root, sourceValue)] as const
    )
  );

  const output: RollupOptions['output'] = supportedImportNames.map(
    (importName) => {
      const format = importNameToFormat(importName);

      return {
        entryFileNames: `[name]/[name].${formatToExtension(format)}`,
        format,
        dir: distDir,
        sourcemap: isProduction && format === 'esm',
      };
    }
  );

  const rollupOptions: RollupOptions = {
    input,
    output,
    plugins: [
      typescriptRollupPlugin({
        compilerOptions: {
          composite: false,
        },
        exclude: [...(tsConfig.exclude ?? []), 'rollup.config.ts'],
        outputToFilesystem: false,
      }),
      dtsRollupPlugin(root, typeVersions, tsconfigJSONPath),
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      peerDeepsExternalRollupPlugin() as unknown as InputPluginOption,
      nodeResolveRollupPlugin({
        preferBuiltins: true,
      }),
      commonJSRollupPlugin(),
      isProduction &&
        terserRollupPlugin({
          output: {comments: false},
          compress: {
            keep_infinity: true,
            pure_getters: true,
            passes: 10,
          },
        }),
    ],
  };

  return rollupOptions;
};
