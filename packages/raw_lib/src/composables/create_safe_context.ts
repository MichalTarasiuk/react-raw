import {createContext, useContext} from 'react';

import {uppercaseFirst} from '../utils/utils_alias';

export const createSafeContext = <ContextValue>(name: string) => {
  const initialContextValue = Symbol('initial-context-value');
  const isInitialContextValue = (value: unknown): value is symbol =>
    value === initialContextValue;

  const contextName = uppercaseFirst(name);
  const context = createContext<ContextValue | symbol>(initialContextValue);

  const useSafeContext = () => {
    const contextValue = useContext(context);

    if (isInitialContextValue(contextValue)) {
      throw new Error(
        `use${contextName} must be called within a <${contextName}Provider />`
      );
    }

    return contextValue;
  };

  return [context.Provider, useSafeContext] as const;
};
