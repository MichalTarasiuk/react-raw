import {Element} from 'html-react-parser';

import type {DOMNode} from 'html-react-parser';

export const isElement = (domNode: DOMNode): domNode is Element =>
  domNode instanceof Element;
