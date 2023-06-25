import {hasOwn, isString} from '@react-raw/lib/source';

import type {JsonObject} from 'type-fest';

export const readDistDir = (jsonObject: JsonObject) => {
  if (hasOwn(jsonObject, 'distDir') && isString(jsonObject.distDir)) {
    return jsonObject.distDir;
  }

  return null;
};
