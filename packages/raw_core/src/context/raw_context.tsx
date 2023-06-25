import {createSafeContext} from '@react-raw/lib/composables';
import {useMemo, type ReactNode} from 'react';

import type {Resolvers} from '../raw/raw_alias';

type ReactRawContextValue = {
  readonly resolvers: Resolvers;
};

const [RawProviderImpl, useRawContext] =
  createSafeContext<ReactRawContextValue>('raw');

type ReactRawProviderProps = {
  readonly children: ReactNode;
  readonly resolvers?: Resolvers;
};

const initialResolvers: Resolvers = {};

function RawProvider({
  children,
  resolvers = initialResolvers,
}: ReactRawProviderProps) {
  const value = useMemo(
    () => ({
      resolvers,
    }),
    [resolvers]
  );

  return <RawProviderImpl value={value}>{children}</RawProviderImpl>;
}

export {RawProvider, useRawContext};
