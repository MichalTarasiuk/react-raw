import {
  isJSONObject,
  getDirectories,
  readJSONFile,
} from '@react-raw/lib/source';
import {join} from 'node:path';

import {isPackageJsonFile} from './is_package_json';

const PACKAGE_JSON_NAME = 'package.json';

const PACKAGES_DIRNAME = 'packages';
const PACKAGES_PATH = join(process.cwd(), PACKAGES_DIRNAME);

const directories = getDirectories(PACKAGES_PATH);

export const packageJsons = directories.flatMap((packageName) => {
  const packageJsonPath = join(PACKAGES_PATH, packageName, PACKAGE_JSON_NAME);
  const packageJsonFile = readJSONFile(packageJsonPath);

  if (!isJSONObject(packageJsonFile) || !isPackageJsonFile(packageJsonFile)) {
    return [];
  }

  return [{packageJsonPath, packageJsonFile}];
});

export const packageJsonFiles = packageJsons.map(
  ({packageJsonFile}) => packageJsonFile
);
