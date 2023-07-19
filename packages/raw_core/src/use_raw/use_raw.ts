import {mergeObjects} from '@react-raw/lib/utils';
import moize from 'moize';
import {useCallback} from 'react';

import {useRawContext} from '../raw_context';

import {
  toResolvers,
  type RawResolvers,
} from './to_resolvers/to_resolvers_alias';

import {raw} from '~raw/raw';

const moizeMergeObjects = moize(mergeObjects);

const initial = {
  hookRawResolvers: {},
  paramRawResolvers: {},
};

export const useRaw = (
  hookRawResolvers: RawResolvers = initial.hookRawResolvers
) => {
  const {resolvers} = useRawContext();

  return useCallback(
    (
      rawString: string,
      paramRawResolvers: RawResolvers = initial.paramRawResolvers
    ) => {
      const rawResolvers = moizeMergeObjects(
        hookRawResolvers,
        paramRawResolvers
      );

      return raw(
        rawString,
        moizeMergeObjects(resolvers, toResolvers(rawResolvers))
      );
    },
    [hookRawResolvers, resolvers]
  );
};
