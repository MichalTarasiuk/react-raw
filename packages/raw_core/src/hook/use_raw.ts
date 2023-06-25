import {useCallback} from 'react';

import {useRawContext} from '../context/raw_context';
import {raw as rawImpl} from '../raw/raw_alias';

import {
  toResolvers,
  type RawResolvers,
} from './to_resolvers/to_resolvers_alias';

export const useRaw = (_hookRawResolvers?: RawResolvers) => {
  useRawContext();

  return useCallback((rawString: string, _paramRawResolvers?: RawResolvers) => {
    return rawImpl(rawString, toResolvers({}));
  }, []);
};
