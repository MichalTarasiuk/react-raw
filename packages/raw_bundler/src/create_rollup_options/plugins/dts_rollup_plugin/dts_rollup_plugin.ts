import {isObject} from '@react-raw/lib/source';

import {createDtsState} from './create_dts_state';
import {generateDtsBundle} from './generate_dts_bundle';
import {getDtsOptionsArray} from './get_dts_options_array/get_dts_options_array';

import type {readTypesVersions} from '../../helpers/helpers_alias';
import type {InputPluginOption} from 'rollup';

type Options = {
  readonly sourceDirectory: string;
  readonly typesVersions: ReturnType<typeof readTypesVersions>;
  readonly tsconfigJSONPath: string;
};

export const dtsRollupPlugin = ({
  sourceDirectory,
  tsconfigJSONPath,
  typesVersions,
}: Options): InputPluginOption => {
  const dtsState = createDtsState(sourceDirectory);

  return {
    name: dtsRollupPlugin.name,
    renderStart: (_, {input}) => {
      if (!isObject(input)) {
        return;
      }

      const dtsOptionsArray = getDtsOptionsArray(input, typesVersions);
      const newDtsOptionsArray = dtsOptionsArray.filter(
        (dtsOptions) => !dtsState.has(dtsOptions.input)
      );

      newDtsOptionsArray.forEach((dtsOptions) => dtsState.set(dtsOptions));

      generateDtsBundle(tsconfigJSONPath, newDtsOptionsArray);
    },
    watchChange: (changedFilePath: string) => {
      const dtsItems = dtsState.get(changedFilePath);

      dtsItems.forEach((dtsItem) => {
        dtsState.delete(dtsItem.dtsOptions.input);
      });
    },
  };
};
