import {readSource} from './read_source';
import {readTypesVersions} from './read_types_versions';

import type {JsonObject} from 'type-fest';

export type PackageJSON = Exclude<ReturnType<typeof readPackageJSON>, null>;

export const readPackageJSON = (jsonObject: JsonObject) => {
  return {
    source: readSource(jsonObject),
    typeVersions: readTypesVersions(jsonObject),
  };
};
