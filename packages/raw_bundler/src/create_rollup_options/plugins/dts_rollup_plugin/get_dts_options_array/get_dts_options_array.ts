import {findTypeVersion} from './find_type_version';

import type {PackageJSON} from '../../../helpers/helpers_alias';
import type {createDtsState} from '../create_dts_state';
import type {DtsOptions} from '../generate_dts_bundle';

export const getDtsOptionsArray = (
  input: Record<string, string>,
  typeVersions: PackageJSON['typeVersions'],
  dtsState: ReturnType<typeof createDtsState>
) => {
  return Object.entries(input).flatMap(([inputName, input]) => {
    const output = findTypeVersion(typeVersions, inputName);

    if (dtsState.has(input) || !output) {
      return [];
    }

    const dtsOptions: DtsOptions = {
      input,
      output,
    };

    return [dtsOptions];
  });
};
