import {hasOwn, isJSONObject, isString} from '@react-raw/lib/source';

import type {JsonObject} from 'type-fest';

export type PackageJSONFile = {
  readonly name: string;
  readonly dependencies?: Record<string, string>;
  readonly devDependencies?: Record<string, string>;
};

const FALLBACK_HAS = true;

export const isPackageJSONFile = (
  jsonObject: JsonObject
): jsonObject is PackageJSONFile => {
  const hasName = hasOwn(jsonObject, 'name') && isString(jsonObject.name);

  if (!hasName) {
    return false;
  }

  const hasDependencies = hasOwn(jsonObject, 'dependencies')
    ? isJSONObject(jsonObject.dependencies)
    : FALLBACK_HAS;
  const hasDevDependencies = hasOwn(jsonObject, 'devDependencies')
    ? isJSONObject(jsonObject.devDependencies)
    : FALLBACK_HAS;

  return hasDependencies && hasDevDependencies;
};
