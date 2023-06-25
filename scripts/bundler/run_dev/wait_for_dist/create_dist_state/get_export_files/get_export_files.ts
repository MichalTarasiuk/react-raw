import {readRoot} from '@react-raw/bundler';

import {readExports} from './read_exports';

import type {PackageJSONFile} from '~bundler/inputs/inputs_alias';

export const getExportFiles = (packageJSONFile: PackageJSONFile) => {
  const root = readRoot(packageJSONFile);
  const exports = readExports(root, packageJSONFile);

  return Object.values(exports).flatMap((exportObject) => {
    const exportFiles = Object.values(exportObject);

    return exportFiles;
  });
};
