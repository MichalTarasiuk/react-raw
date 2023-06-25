import {readFileSync} from 'node:fs';

export const readJSONFile = (path: string) => {
  const file = readFileSync(path).toString();

  return JSON.parse(file);
};
