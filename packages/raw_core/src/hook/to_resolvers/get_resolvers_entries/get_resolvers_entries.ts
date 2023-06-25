import {RESOLVE_PROPERTY_NAME} from './consts';
import {deleteAttribute} from './delete_attribute';
import {getResolverEntry} from './get_resolver_entry';

import type {RawResolver, RawResolverObject, ReactHTMLKeyUnion} from '../types';

export const getResolversEntries = <ReactHtmlKey extends ReactHTMLKeyUnion>(
  rawResolverObject: RawResolverObject<ReactHtmlKey>,
  reactHTMLKey: ReactHtmlKey
) => {
  return Object.entries(rawResolverObject).map(
    ([rawResolverName, rawResolverImpl]) => {
      const rawResolver: RawResolver<ReactHtmlKey> = (children, props) => {
        const resolvedRaw = rawResolverImpl(
          children,
          deleteAttribute(props, RESOLVE_PROPERTY_NAME)
        );

        return resolvedRaw;
      };

      return getResolverEntry(reactHTMLKey, {rawResolverName, rawResolver});
    }
  );
};
