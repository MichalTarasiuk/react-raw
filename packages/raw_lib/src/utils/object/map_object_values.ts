import {entries} from './entries';

export const mapObjectValues = <
  UnknownObject extends Record<PropertyKey, unknown>,
  NewValue
>(
  unknownObject: UnknownObject,
  fn: (value: UnknownObject[keyof UnknownObject]) => NewValue
) =>
  Object.fromEntries(
    entries(unknownObject).map(([key, value]) => [key, fn(value)] as const)
  );
