import {readDistDir} from './read_dist_dir';
import {readRoot} from './read_root';
import {readSource} from './read_source';
import {readTypesVersions} from './read_types_versions';

import type {JsonObject} from 'type-fest';

export type PackageJSON = Exclude<ReturnType<typeof readPackageJSON>, null>;

export const readPackageJSON = (jsonObject: JsonObject) => {
  const root = readRoot(jsonObject);
  const distDir = readDistDir(jsonObject);

  if (!root || !distDir) {
    return null;
  }

  const source = readSource(jsonObject);
  const typeVersions = readTypesVersions(jsonObject);

  return {
    root,
    distDir,
    source,
    exports,
    typeVersions,
  };
};
