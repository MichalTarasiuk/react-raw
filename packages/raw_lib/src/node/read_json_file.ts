import {readFileSync} from 'node:fs';

export const readJSONFile = (path: string) => {
  return JSON.parse(readFileSync(path).toString());
};
