import {createContext, useContext, useMemo} from 'react';

import type {ReactNode} from 'react';
import type {Resolvers} from '~raw/raw_alias';

type RawContextValue = {
  readonly resolvers: Resolvers;
};

const initialResolvers: Resolvers = {};

const rawContext = createContext<RawContextValue>({
  resolvers: initialResolvers,
});

type RawProviderProps = {
  readonly children: ReactNode;
  readonly resolvers?: Resolvers;
};

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

  return <rawContext.Provider value={value}>{children}</rawContext.Provider>;
}

const useRawContext = () => useContext(rawContext);

export {RawProvider, useRawContext};
