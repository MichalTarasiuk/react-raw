import type {Resolvers} from './types';
import type {Element} from 'html-react-parser';
import type {ValueOf} from 'type-fest';

export const findResolver = (
  valuesOfResolvers: ReadonlyArray<ValueOf<Resolvers>>,
  element: Element
) => valuesOfResolvers.find((resolver) => resolver.shouldResolve(element));
