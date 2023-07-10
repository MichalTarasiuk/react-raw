import {hasOwn, isJSONObject, isString} from '@react-raw/lib/source';

import type {JsonObject} from 'type-fest';

export type PackageJsonFile = {
  readonly name: string;
  readonly scripts?: Record<string, string>;
  readonly dependencies?: Record<string, string>;
  readonly devDependencies?: Record<string, string>;
};

const hasOptionalJsonObject = (jsonObject: JsonObject, property: string) =>
  hasOwn(jsonObject, property) ? isJSONObject(jsonObject[property]) : true;

export const isPackageJsonFile = (
  jsonObject: JsonObject
): jsonObject is PackageJsonFile => {
  if (!hasOwn(jsonObject, 'name') && isString(jsonObject.name)) {
    return false;
  }

  if (
    !(
      hasOptionalJsonObject(jsonObject, 'dependencies') &&
      hasOptionalJsonObject(jsonObject, 'devDependencies')
    )
  ) {
    return false;
  }

  return hasOptionalJsonObject(jsonObject, 'scripts');
};
