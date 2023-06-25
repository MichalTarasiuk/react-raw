import {hasOwn, isArray, isObject, isString} from '@react-raw/lib/source';

import type {JsonObject} from 'type-fest';

export const readTypesVersions = (jsonObject: JsonObject) => {
  if (
    !(
      hasOwn(jsonObject, 'typesVersions') &&
      isObject(jsonObject.typesVersions) &&
      hasOwn(jsonObject.typesVersions, '*') &&
      isObject(jsonObject.typesVersions['*'])
    )
  ) {
    return {};
  }

  const typesVersions = Object.entries(jsonObject.typesVersions['*']).flatMap(
    ([key, value]) => {
      if (!isArray(value)) {
        return [];
      }

      const typeVersion = value.at(0);

      if (!isString(typeVersion)) {
        return [];
      }

      return [[key, typeVersion] as const];
    }
  );

  return Object.fromEntries(typesVersions);
};
