import {dirname} from 'node:path';

export const isRootFile = (root: string, input: string) =>
  dirname(root) === input;
