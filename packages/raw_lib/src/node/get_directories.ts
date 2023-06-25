import {readdirSync} from 'node:fs';

export const getDirectories = (path: string) =>
  readdirSync(path, {withFileTypes: true}).flatMap((dirent) => {
    if (dirent.isDirectory()) {
      return [dirent.name];
    }

    return [];
  });
