import {hasOwn, isObject, isString, objectEvery} from '@react-raw/lib/source';

import {rewriteNames} from './rewrite_names';

import type {JsonObject} from 'type-fest';

export const readSource = (jsonObject: JsonObject) => {
  if (!(hasOwn(jsonObject, 'source') && isObject(jsonObject.source))) {
    return {};
  }

  if (
    !objectEvery(jsonObject.source, ([key, value], falsy) =>
      isString(key) && isString(value) ? {[key]: value} : falsy
    )
  ) {
    return {};
  }

  return rewriteNames(jsonObject.source);
};
