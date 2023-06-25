import {RESOLVE_PROPERTY_NAME} from './consts';
import {deleteAttribute} from './delete_attribute';
import {getResolverEntry} from './get_resolver_entry';

import type {RawResolver, RawResolverObject, ReactHTMLKeyUnion} from '../types';

export const getResolverEntries = <ReactHtmlKey extends ReactHTMLKeyUnion>(
  reactHTMLKey: ReactHtmlKey,
  rawResolverObject: RawResolverObject<ReactHtmlKey>
) => {
  return Object.entries(rawResolverObject).map(
    ([rawResolverName, rawResolverImpl]) => {
      const rawResolver: RawResolver<ReactHtmlKey> = (children, props) =>
        rawResolverImpl(
          children,
          deleteAttribute(props, RESOLVE_PROPERTY_NAME)
        );

      return getResolverEntry(reactHTMLKey, {rawResolverName, rawResolver});
    }
  );
};
