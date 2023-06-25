import {hasOwn, isString} from '@react-raw/lib/source';

import type {JsonObject} from 'type-fest';

export const readRoot = (jsonObject: JsonObject) => {
  if (hasOwn(jsonObject, 'root') && isString(jsonObject.root)) {
    return jsonObject.root;
  }

  return null;
};
