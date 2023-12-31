import {mapObjectValues} from '@react-raw/lib/source';
import commonJSRollupPlugin from '@rollup/plugin-commonjs';
import nodeResolveRollupPlugin from '@rollup/plugin-node-resolve';
import terserRollupPlugin from '@rollup/plugin-terser';
import typescriptRollupPlugin from '@rollup/plugin-typescript';
import {getTsconfig} from 'get-tsconfig';
import {join} from 'path';
import peerDeepsExternalRollupPlugin from 'rollup-plugin-peer-deps-external';

import {
  DEFAULT_DIST_DIR,
  DEFAULT_TSCONFIG_JSON_PATH,
  supportedImportNames,
} from './constants/constants_alias';
import {
  formatToExtension,
  importNameToFormat,
  readTypesVersions,
  rewriteNames,
} from './helpers/helpers_alias';
import {dtsRollupPlugin} from './plugins/plugins_alias';

import type {InputPluginOption, RollupOptions} from 'rollup';
import type {JsonObject} from 'type-fest';

type Options = {
  readonly sourceDirectory: string;
  readonly source: Record<string, string>;
  readonly isProduction: boolean;
};

export const createRollupOptions = (
  jsonObject: JsonObject,
  {sourceDirectory, source, isProduction}: Options
) => {
  const input: RollupOptions['input'] = rewriteNames(
    mapObjectValues(source, (sourceValue) => join(sourceDirectory, sourceValue))
  );
  const output: RollupOptions['output'] = supportedImportNames.map(
    (importName) => {
      const format = importNameToFormat(importName);

      return {
        entryFileNames: `[name]/[name].${formatToExtension(format)}`,
        format,
        dir: DEFAULT_DIST_DIR,
        sourcemap: isProduction && format === 'esm',
      };
    }
  );

  const tsconfig = getTsconfig(DEFAULT_TSCONFIG_JSON_PATH)?.config;
  const typesVersions = readTypesVersions(jsonObject);

  const rollupOptions: RollupOptions = {
    input,
    output,
    treeshake: {
      moduleSideEffects: false,
    },
    plugins: [
      typescriptRollupPlugin({
        compilerOptions: {
          composite: false,
        },
        exclude: [...(tsconfig?.exclude ?? []), 'rollup.config.ts'],
        outputToFilesystem: false,
      }),
      dtsRollupPlugin({
        sourceDirectory,
        typesVersions,
        tsconfigJSONPath: DEFAULT_TSCONFIG_JSON_PATH,
      }),
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
