import {findTypeVersion} from './find_type_version';

import type {readTypesVersions} from '../../../helpers/helpers_alias';
import type {DtsOptions} from '../generate_dts_bundle';

export const getDtsOptionsArray = (
  input: Record<string, string>,
  typeVersions: ReturnType<typeof readTypesVersions>
) => {
  return Object.entries(input).flatMap(([inputName, input]) => {
    const output = findTypeVersion(typeVersions, inputName);

    if (!output) {
      return [];
    }

    const dtsOptions: DtsOptions = {
      input,
      output,
    };

    return [dtsOptions];
  });
};
