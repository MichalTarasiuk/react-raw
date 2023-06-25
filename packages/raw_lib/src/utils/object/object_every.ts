import {entries} from './entries';

import type {ObjectEntry} from 'type-fest/source/entry';

type FalsySymbol = typeof falsySymbol;

const falsySymbol = Symbol();

export const objectEvery = <
  UnknownObject extends Record<PropertyKey, unknown>,
  AssertObject extends UnknownObject
>(
  unknownObject: UnknownObject,
  fn: (
    objectEntry: ObjectEntry<UnknownObject>,
    falsy: FalsySymbol
  ) => AssertObject | typeof falsySymbol
): unknownObject is AssertObject =>
  entries(unknownObject).every(
    (entry) => fn(entry, falsySymbol) !== falsySymbol
  );
