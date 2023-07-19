import {isObject} from '../typeof';

export const isDeepKeyof = (
  unknownObject: Record<PropertyKey, unknown>,
  searchKey: unknown
) => {
  return Object.entries(unknownObject).some(
    ([key, value]): boolean =>
      searchKey === key || (isObject(value) && isDeepKeyof(value, searchKey))
  );
};
