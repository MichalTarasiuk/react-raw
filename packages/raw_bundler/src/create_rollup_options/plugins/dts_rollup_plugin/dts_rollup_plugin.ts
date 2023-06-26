import {isObject} from '@react-raw/lib/source';

import {createDtsState} from './create_dts_state';
import {generateDtsBundle} from './generate_dts_bundle';
import {getDtsOptionsArray} from './get_dts_options_array/get_dts_options_array';

import type {PackageJSON} from '../../helpers/helpers_alias';
import type {InputPluginOption} from 'rollup';

export const dtsRollupPlugin = (
  tsconfigJSONPath: string,
  typeVersions: PackageJSON['typeVersions']
): InputPluginOption => {
  const dtsState = createDtsState();

  return {
    name: dtsRollupPlugin.name,
    renderStart: (_, {input}) => {
      if (!isObject(input)) {
        return;
      }

      const dtsOptionsArray = getDtsOptionsArray(input, typeVersions);
      const newDtsOptionsArray = dtsOptionsArray.filter(
        (dtsOptions) => !dtsState.has(dtsOptions.input)
      );

      newDtsOptionsArray.forEach((dtsOptions) => dtsState.set(dtsOptions));

      generateDtsBundle(tsconfigJSONPath, dtsOptionsArray);
    },
    watchChange: (changedFile: string) => {
      const {dtsOptions} = dtsState.get(changedFile) ?? {};

      if (dtsOptions) {
        dtsState.delete(dtsOptions.input);
      }
    },
  };
};
