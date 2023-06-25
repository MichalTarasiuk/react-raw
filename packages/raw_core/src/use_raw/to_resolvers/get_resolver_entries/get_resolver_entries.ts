import {RESOLVE_PROPERTY_NAME} from './consts';
import {deleteAttribute} from './delete_attribute';
import {getResolverEntry} from './get_resolver_entry';

import type {
  RawResolver,
  RawResolverObject,
  ReactHTMLKey as UnknownReactHTMLKey,
} from '../types';

export const getResolverEntries = <ReactHtmlKey extends UnknownReactHTMLKey>(
  reactHTMLKey: ReactHtmlKey,
  rawResolverObject: RawResolverObject<ReactHtmlKey>
) => {
  const rawResolverEntries = Object.entries(rawResolverObject);

  return rawResolverEntries.map(([rawResolverName, rawResolverImpl]) => {
    const rawResolver: RawResolver<ReactHtmlKey> = (children, props) => {
      return rawResolverImpl(
        children,
        deleteAttribute(props, RESOLVE_PROPERTY_NAME)
      );
    };

    return getResolverEntry(reactHTMLKey, {rawResolverName, rawResolver});
  });
};
