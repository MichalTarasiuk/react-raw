import {hasOwn, isObject} from '@react-raw/lib/source';

import type {PackageJSONFile} from '../package_jsons/package_jsons_alias';

export const bundlerIsSupported = (packageJSONFile: PackageJSONFile) =>
  hasOwn(packageJSONFile, 'source') && isObject(packageJSONFile.source);
