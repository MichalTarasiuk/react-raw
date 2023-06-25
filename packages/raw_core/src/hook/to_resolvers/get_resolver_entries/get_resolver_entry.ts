import {RESOLVE_PROPERTY_NAME} from './consts';

import type {RawResolver, ReactHTMLKeyUnion} from '../types';
import type {Element} from 'html-react-parser';

export const getResolverName = <ReactHTMLKey extends ReactHTMLKeyUnion>(
  reactHTMLKey: ReactHTMLKey,
  rawResolverName?: string
) => {
  if (rawResolverName) {
    return `${String(reactHTMLKey)}.${rawResolverName}`;
  }

  return reactHTMLKey;
};

type RawResolverRecord = {
  readonly rawResolverName?: string;
  readonly rawResolver: RawResolver;
};

const DEFAULT_IS_RESOLVABLE = true;

export const getResolverEntry = <ReactHTMLKey extends ReactHTMLKeyUnion>(
  reactHTMLKey: ReactHTMLKey,
  {rawResolverName, rawResolver: resolve}: RawResolverRecord
) => {
  const resolverName = getResolverName(reactHTMLKey, rawResolverName);

  const shouldResolve = (element: Element) => {
    const isResolvable = rawResolverName
      ? element.attribs[RESOLVE_PROPERTY_NAME] === rawResolverName
      : DEFAULT_IS_RESOLVABLE;

    return element.tagName === reactHTMLKey && isResolvable;
  };

  return [
    resolverName,
    {
      shouldResolve,
      resolve,
    },
  ] as const;
};
