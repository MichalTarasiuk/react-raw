import type htmlReactParser from 'html-react-parser';
import type {ReactHTML, DetailedHTMLFactory} from 'react';

export type ReactHTMLKeyUnion = keyof ReactHTML | Omit<string, keyof ReactHTML>;

type InferProps<ReactHtmlElement> =
  ReactHtmlElement extends DetailedHTMLFactory<infer Props, HTMLElement>
    ? Props
    : never;

type InferRawResolverProps<RawResolverKey extends ReactHTMLKeyUnion> =
  RawResolverKey extends keyof ReactHTML
    ? InferProps<ReactHTML[RawResolverKey]>
    : Record<string, string>;

export type RawResolver<
  RawResolverKey extends ReactHTMLKeyUnion = ReactHTMLKeyUnion
> = (
  children: ReturnType<typeof htmlReactParser>,
  props: InferRawResolverProps<RawResolverKey>
) => JSX.Element | null;

export type RawResolverObject<RawResolverKey extends ReactHTMLKeyUnion> =
  Record<string, RawResolver<RawResolverKey>>;

export type RawResolvers = Partial<{
  readonly [RawResolverKey in ReactHTMLKeyUnion & PropertyKey]:
    | RawResolver<RawResolverKey>
    | RawResolverObject<RawResolverKey>;
}>;
