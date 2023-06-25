import {
  entries,
  mapPutNewLazy,
  fromEntries,
  isObject,
} from '@react-raw/lib/utils';

import {
  getResolverEntry,
  getResolversEntries,
} from './get_resolvers_entries/get_resolvers_entries_alias';

import type {RawResolvers} from './types';
import type {Resolvers} from '../../raw/types';

const resolversCache = new Map<RawResolvers, Resolvers>();

export const toResolvers = <NewRawResolvers extends RawResolvers>(
  newRawResolvers: NewRawResolvers
) => {
  const resolvers = mapPutNewLazy(
    resolversCache,
    newRawResolvers,
    (rawResolvers) => {
      const entriesResolvers = entries(rawResolvers).flatMap(
        ([reactHTMLKey, rawResolver]) => {
          if (!rawResolver) {
            return [];
          }

          if (isObject(rawResolver)) {
            return getResolversEntries(rawResolver, reactHTMLKey);
          }

          return [getResolverEntry(reactHTMLKey, {rawResolver})];
        }
      );

      return fromEntries(entriesResolvers);
    }
  );

  return resolvers;
};
