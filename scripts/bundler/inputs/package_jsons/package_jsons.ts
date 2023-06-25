import {
  isJSONObject,
  getDirectories,
  readJSONFile,
} from '@react-raw/lib/source';
import {join} from 'node:path';

import {isPackageJSONFile} from './is_package_json';

const PACKAGE_JSON_NAME = 'package.json';

const PACKAGES_DIRNAME = 'packages';
const PACKAGES_PATH = join(process.cwd(), PACKAGES_DIRNAME);

const directories = getDirectories(PACKAGES_PATH);

export const packageJSONs = directories.flatMap((packageName) => {
  const packageJSONPath = join(PACKAGES_PATH, packageName, PACKAGE_JSON_NAME);
  const packageJSONFile = readJSONFile(packageJSONPath);

  if (!isJSONObject(packageJSONFile) || !isPackageJSONFile(packageJSONFile)) {
    return [];
  }

  return [{packageJSONPath, packageJSONFile}];
});

export const packageJSONFiles = packageJSONs.map(
  ({packageJSONFile}) => packageJSONFile
);
