import {readExports} from './read_exports';

import type {PackageJsonFile} from '~bundler/inputs/inputs_alias';

export const getExportFiles = (packageJsonFile: PackageJsonFile) => {
  const exports = readExports(packageJsonFile);

  return Object.values(exports).flatMap((exportObject) =>
    Object.values(exportObject)
  );
};
