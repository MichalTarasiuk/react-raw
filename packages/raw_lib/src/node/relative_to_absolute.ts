import {join} from 'node:path';

export const relativeToAbsolute = (relative: string) =>
  join(process.cwd(), relative);
