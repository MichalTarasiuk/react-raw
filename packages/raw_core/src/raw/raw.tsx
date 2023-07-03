/* eslint-disable functional/prefer-readonly-type */
import {mapPutNewLazy} from '@react-raw/lib/utils';
import htmlReactParser, {
  attributesToProps,
  domToReact,
} from 'html-react-parser';

import {findResolver} from './find_resolver';
import {isElement} from './is_element';
import {None} from './None';

import type {Resolvers} from './types';
import type {DOMNode} from 'html-react-parser';

const rawCacheMap = new Map<
  Resolvers,
  Map<string, ReturnType<typeof htmlReactParser>>
>();

export const raw = (rawString: string, resolvers: Resolvers) => {
  const resolverValues = Object.values(resolvers);

  const rawCacheValue = mapPutNewLazy(
    rawCacheMap,
    resolvers,
    () => new Map<string, ReturnType<typeof htmlReactParser>>()
  );

  const reactJSXElement = mapPutNewLazy(rawCacheValue, rawString, (rawString) =>
    htmlReactParser(rawString, {
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
            ) ?? <None />
          );
        }

        return domNode;
      },
    })
  );

  return reactJSXElement;
};
