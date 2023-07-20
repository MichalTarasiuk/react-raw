import {entries, fromEntries, isObject} from '@react-raw/lib/utils';
import moize from 'moize';

import {
  getResolverEntry,
  getResolverEntries,
} from './get_resolver_entries/get_resolver_entries_alias';

import type {RawResolvers} from './types';

const toResolversImpl = (rawResolvers: RawResolvers) => {
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
};

export const toResolvers = moize(toResolversImpl);
