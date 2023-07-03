import {readFileSync} from 'node:fs';

export const readJSONFile = (path: string) => {
  const fileContent = readFileSync(path).toString();

  return JSON.parse(fileContent);
};
