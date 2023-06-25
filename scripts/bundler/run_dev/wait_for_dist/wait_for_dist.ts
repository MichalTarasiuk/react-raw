import * as chokidar from 'chokidar';
import {dirname, join} from 'node:path';

import {createDistState} from './create_dist_state/create_dist_state';

import {packageJSONs} from '~bundler/inputs/inputs_alias';

const DIST_DIRNAME = 'dist';

export const waitForDist = (packageName: string) => {
  const packageJSONObject = packageJSONs.find(
    ({packageJSONFile}) => packageJSONFile.name === packageName
  );

  if (!packageJSONObject) {
    throw Error('`packageJSONObject` is undefined');
  }

  const {packageJSONPath, packageJSONFile} = packageJSONObject;

  const packagePath = dirname(packageJSONPath);

  return new Promise((resolve) => {
    const distDirname = join(packagePath, DIST_DIRNAME);
    const distState = createDistState(packagePath, packageJSONFile);

    chokidar.watch(distDirname).on('add', (addedFile) => {
      distState.setAsCreated(addedFile);

      if (!distState.allFilesAreCreated()) {
        return;
      }

      resolve(null);
    });
  });
};
