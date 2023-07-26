import * as chokidar from 'chokidar';
import {dirname, join} from 'node:path';

import {packageJsons} from '../../inputs/inputs_alias';

import {createDistState} from './create_dist_state/create_dist_state';

const DIST_DIRNAME = 'dist';

export const waitForDist = (packageName: string) => {
  const packageJsonObject = packageJsons.find(
    ({packageJsonFile}) => packageJsonFile.name === packageName
  );

  if (!packageJsonObject) {
    throw Error('`packageJsonObject` is undefined');
  }

  const {packageJsonPath, packageJsonFile} = packageJsonObject;
  const packageJsonDirname = dirname(packageJsonPath);

  return new Promise((resolve) => {
    const distDirname = join(packageJsonDirname, DIST_DIRNAME);
    const distState = createDistState(packageJsonDirname, packageJsonFile);

    chokidar.watch(distDirname).on('add', (addedFile) => {
      distState.setAsCreated(addedFile);

      if (!distState.allFilesAreCreated()) {
        return;
      }

      resolve(null);
    });
  });
};
