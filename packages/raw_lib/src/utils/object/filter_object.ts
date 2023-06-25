import {entries} from './entries';

import type {ValueOf} from 'type-fest';

export const filterObject = <
  UnknownObject extends Record<PropertyKey, unknown>
>(
  unknownObject: UnknownObject,
  predicate: (
    key: keyof UnknownObject,
    value: ValueOf<UnknownObject>
  ) => boolean
) => {
  const entriesObject = entries(unknownObject).filter(([key, value]) =>
    predicate(key, value)
  );

  return Object.fromEntries(entriesObject);
};
