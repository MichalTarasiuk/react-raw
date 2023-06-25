/* eslint-disable functional/prefer-readonly-type */
import {mapGetLazy, mapPutNewLazy} from '@react-raw/lib/utils';
import htmlReactParser, {
  attributesToProps,
  domToReact,
} from 'html-react-parser';

import {EmptyFragment} from './empty_fragment';
import {findResolver} from './find_resolver';
import {isElement} from './is_element';

import type {Resolvers} from './types';
import type {DOMNode, HTMLReactParserOptions} from 'html-react-parser';

const rawCacheMap = new Map<
  Resolvers,
  Map<string, ReturnType<typeof htmlReactParser>>
>();

export const raw = (rawString: string, resolvers: Resolvers) => {
  const resolverValues = Object.values(resolvers);

  const htmlReactParserOptions: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (!isElement(domNode)) {
        return domNode;
      }

      const resolver = findResolver(resolverValues, domNode);

      if (resolver) {
        const {children, attribs} = domNode;

        return (
          resolver.resolve(
            domToReact(children),
            attributesToProps(attribs)
          ) ?? <EmptyFragment />
        );
      }

      return domNode;
    },
  };

  const rawCache = mapGetLazy(
    rawCacheMap,
    resolvers,
    () => new Map<string, ReturnType<typeof htmlReactParser>>()
  );

  const reactJSXElement = mapPutNewLazy(rawCache, rawString, (property) =>
    htmlReactParser(property, htmlReactParserOptions)
  );

  return reactJSXElement;
};
