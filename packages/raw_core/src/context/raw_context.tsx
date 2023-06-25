import {createSafeContext} from '@react-raw/lib/composables';
import {useMemo, type ReactNode} from 'react';

import type {Resolvers} from '~raw/raw_alias';

type RawContextValue = {
  readonly resolvers: Resolvers;
};

const [RawProviderImpl, useRawContext] =
  createSafeContext<RawContextValue>('raw');

type RawProviderProps = {
  readonly children: ReactNode;
  readonly resolvers?: Resolvers;
};

const initialResolvers: Resolvers = {};

function RawProvider({
  children,
  resolvers = initialResolvers,
}: RawProviderProps) {
  const value = useMemo(
    () => ({
      resolvers,
    }),
    [resolvers]
  );

  return <RawProviderImpl value={value}>{children}</RawProviderImpl>;
}

export {RawProvider, useRawContext};
