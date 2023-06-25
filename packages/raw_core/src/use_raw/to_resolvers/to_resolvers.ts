import {
  entries,
  mapPutNewLazy,
  fromEntries,
  isObject,
} from '@react-raw/lib/utils';

import {
  getResolverEntry,
  getResolverEntries,
} from './get_resolver_entries/get_resolver_entries_alias';

import type {RawResolvers as UnkownRawResolvers} from './types';
import type {Resolvers} from '~raw/raw_alias';

const resolversCache = new Map<UnkownRawResolvers, Resolvers>();

export const toResolvers = <RawResolvers extends UnkownRawResolvers>(
  rawResolvers: RawResolvers
) => {
  return mapPutNewLazy(resolversCache, rawResolvers, (rawResolvers) => {
    const entriesResolvers = entries(rawResolvers).flatMap(
      ([reactHTMLKey, rawResolver]) => {
        if (!rawResolver) {
          return [];
        }

        if (isObject(rawResolver)) {
          return getResolverEntries(reactHTMLKey, rawResolver);
        }

        return [getResolverEntry(reactHTMLKey, {rawResolver})];
      }
    );

    return fromEntries(entriesResolvers);
  });
};
