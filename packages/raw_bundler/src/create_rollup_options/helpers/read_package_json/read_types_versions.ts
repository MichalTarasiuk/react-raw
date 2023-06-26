import {hasOwn, isArray, isObject, isString} from '@react-raw/lib/source';

import {rewriteNames} from './rewrite_names';

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

  const typesVersionsEntries = Object.entries(
    jsonObject.typesVersions['*']
  ).flatMap(([key, value]) => {
    if (!isArray(value)) {
      return [];
    }

    const typeVersion = value.at(0);

    if (!isString(typeVersion)) {
      return [];
    }

    return [[key, typeVersion] as const];
  });
  const typeVersions = Object.fromEntries(typesVersionsEntries);

  return rewriteNames(typeVersions);
};
