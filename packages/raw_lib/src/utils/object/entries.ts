/* eslint-disable @typescript-eslint/consistent-type-assertions */

import type {ObjectEntries} from 'type-fest/source/entries';

export const entries = <UnknwonObject extends Record<PropertyKey, unknown>>(
  unknownObject: UnknwonObject
) => Object.entries(unknownObject) as ObjectEntries<UnknwonObject>;
