import type htmlReactParser from 'html-react-parser';
import type {Element} from 'html-react-parser';

export type Resolvers = Record<
  string,
  {
    readonly shouldResolve: (element: Element) => boolean;
    readonly resolve: (
      children: ReturnType<typeof htmlReactParser>,
      props: Record<string, string>
    ) => JSX.Element | null;
  }
>;
