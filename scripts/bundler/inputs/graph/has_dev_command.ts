import {hasOwn, isString} from '@react-raw/lib/source';

import type {PackageJsonFile} from '../inputs_alias';

export const hasDevCommand = (packageJsonFile: PackageJsonFile) =>
  packageJsonFile.scripts &&
  hasOwn(packageJsonFile.scripts, 'dev') &&
  isString(packageJsonFile.scripts.dev);
