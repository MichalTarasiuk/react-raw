import {useCallback} from 'react';

import {useRawContext} from '../raw_context';

import {
  toResolvers,
  type RawResolvers,
} from './to_resolvers/to_resolvers_alias';

import {raw} from '~raw/raw';

export const useRaw = (hookRawResolvers?: RawResolvers) => {
  const {resolvers} = useRawContext();

  return useCallback(
    (rawString: string, paramRawResolvers?: RawResolvers) => {
      const rawResolvers = {...hookRawResolvers, ...paramRawResolvers};

      return raw(rawString, {...resolvers, ...toResolvers(rawResolvers)});
    },
    [hookRawResolvers, resolvers]
  );
};
