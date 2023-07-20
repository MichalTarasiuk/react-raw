import {RESOLVE_PROPERTY_NAME} from './consts';

import type {RawResolver, ReactHTMLKey as UnknownReactHTMLKey} from '../types';
import type {ValueOf} from 'type-fest';
import type {Resolvers} from '~raw/raw_alias';

const getResolverName = <ReactHTMLKey extends UnknownReactHTMLKey>(
  reactHTMLKey: ReactHTMLKey,
  rawResolverName?: string
) => {
  if (rawResolverName) {
    return `${String(reactHTMLKey)}.${rawResolverName}`;
  }

  return reactHTMLKey;
};

type RawResolverObject = {
  readonly rawResolverName?: string;
  readonly rawResolver: RawResolver;
};

export const getResolverEntry = <ReactHTMLKey extends UnknownReactHTMLKey>(
  reactHTMLKey: ReactHTMLKey,
  {rawResolverName, rawResolver}: RawResolverObject
) => {
  const resolverValue: ValueOf<Resolvers> = {
    shouldResolve: (element) => {
      const isResolvable = rawResolverName
        ? element.attribs[RESOLVE_PROPERTY_NAME] === rawResolverName
        : true;

      return element.tagName === reactHTMLKey && isResolvable;
    },
    resolve: rawResolver,
  };

  return [
    getResolverName(reactHTMLKey, rawResolverName),
    resolverValue,
  ] as const;
};
