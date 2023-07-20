import htmlReactParser, {
  attributesToProps,
  domToReact,
} from 'html-react-parser';
import moize from 'moize';

import {findResolver} from './find_resolver';
import {isElement} from './is_element';
import {None} from './None';

import type {Resolvers} from './types';
import type {DOMNode} from 'html-react-parser';

const rawImpl = (rawString: string, resolvers: Resolvers) => {
  const valuesOfResolvers = Object.values(resolvers);

  return htmlReactParser(rawString, {
    replace: (domNode: DOMNode) => {
      if (!isElement(domNode)) {
        return domNode;
      }

      const resolver = findResolver(valuesOfResolvers, domNode);

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
  });
};

export const raw = moize(rawImpl);
