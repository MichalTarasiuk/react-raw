import {hasOwn, isObject} from '@react-raw/lib/utils';

import type {HTMLAttributes} from 'react';

export const deleteAttribute = <Attributes extends HTMLAttributes<HTMLElement>>(
  {...attributes}: Attributes,
  attribute: string
) => {
  if (isObject(attributes) && hasOwn(attributes, attribute)) {
    delete attributes[attribute];
  }

  return attributes;
};
