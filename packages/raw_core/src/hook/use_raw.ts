import moize from 'moize';
import {useCallback} from 'react';

import {useRawContext} from '../context/raw_context';
import {raw as rawImpl} from '../raw/raw_alias';

import {
  toResolvers,
  type RawResolvers,
} from './to_resolvers/to_resolvers_alias';

import type {Resolvers} from '../raw/raw_alias';

const mergeResolvers = moize(
  (resolversA: Resolvers, resolversB: Resolvers) => ({
    ...resolversA,
    ...resolversB,
  })
);

const mergeRawResolvers = moize(
  (
    hookRawResolvers: RawResolvers | undefined,
    paramRawResolvers: RawResolvers | undefined
  ) => ({
    ...hookRawResolvers,
    ...paramRawResolvers,
  })
);

export const useRaw = (hookRawResolvers?: RawResolvers) => {
  const {resolvers} = useRawContext();

  return useCallback(
    (rawString: string, paramRawResolvers?: RawResolvers) => {
      const rawResolvers = mergeRawResolvers(
        hookRawResolvers,
        paramRawResolvers
      );

      return rawImpl(
        rawString,
        // @ts-ignore
        mergeResolvers(resolvers, toResolvers(rawResolvers))
      );
    },
    [hookRawResolvers, resolvers]
  );
};
