import type htmlReactParser from 'html-react-parser';
import type {ReactHTML, DetailedHTMLFactory} from 'react';

export type ReactHTMLKey = keyof ReactHTML | Omit<string, keyof ReactHTML>;

type InferProps<ReactHtmlElement> =
  ReactHtmlElement extends DetailedHTMLFactory<infer Props, HTMLElement>
    ? Props
    : never;

type InferRawResolverProps<RawResolverKey extends ReactHTMLKey> =
  RawResolverKey extends keyof ReactHTML
    ? InferProps<ReactHTML[RawResolverKey]>
    : Record<string, string>;

export type RawResolver<RawResolverKey extends ReactHTMLKey = ReactHTMLKey> = (
  children: ReturnType<typeof htmlReactParser>,
  props: InferRawResolverProps<RawResolverKey>
) => JSX.Element | null;

export type RawResolverObject<RawResolverKey extends ReactHTMLKey> = Record<
  string,
  RawResolver<RawResolverKey>
>;

export type RawResolvers = Partial<{
  readonly [RawResolverKey in ReactHTMLKey & PropertyKey]:
    | RawResolver<RawResolverKey>
    | RawResolverObject<RawResolverKey>;
}>;
