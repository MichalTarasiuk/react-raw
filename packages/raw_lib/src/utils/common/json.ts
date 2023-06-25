/* eslint-disable @typescript-eslint/no-use-before-define */
import {isArray, isBoolean, isNumber, isObject, isString} from '../typeof';

import type {JsonValue, JsonArray, JsonObject} from 'type-fest';

export const isJSONValue = (value: unknown): value is JsonValue => {
  return (
    isString(value) ||
    isNumber(value) ||
    isBoolean(value) ||
    isJSONObject(value) ||
    isJSONArray(value)
  );
};

export const isJSONArray = (value: unknown): value is JsonArray => {
  return isArray(value) && value.every(isJSONValue);
};

export const isJSONObject = (value: unknown): value is JsonObject => {
  return (
    isObject(value) &&
    Object.keys(value).every(isString) &&
    Object.values(value).every(isJSONValue)
  );
};
