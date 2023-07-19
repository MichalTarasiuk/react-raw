import {isDeepKeyof, isObject} from '@react-raw/lib/source';
import getDependencyTree from 'dependency-tree';
import {resolve} from 'node:path';

import type {DtsOptions} from './generate_dts_bundle';

type Path = string;

type DtsItem = {
  readonly dtsOptions: DtsOptions;
  readonly test: (absoluteInput: Path) => boolean;
};

export const createDtsState = (sourceDirectoryPath: Path) => {
  const dtsState = new Map<Path, DtsItem>();

  const get = (changedFilePath: Path) => {
    return [...dtsState.values()].filter((dtsItem) =>
      dtsItem.test(changedFilePath)
    );
  };

  const set = (dtsOptions: DtsOptions) => {
    const filename = resolve(dtsOptions.input);
    const directory = resolve(sourceDirectoryPath);

    dtsState.set(dtsOptions.input, {
      dtsOptions,
      test: (changedFilePath) => {
        const dependencyTree = getDependencyTree({
          filename,
          directory,
          filter: (path) => !path.includes('node_modules'),
        });

        return (
          isObject(dependencyTree) &&
          isDeepKeyof(dependencyTree, changedFilePath)
        );
      },
    });
  };

  return {
    get,
    set,
    has: (inputPath: Path) => dtsState.has(inputPath),
    delete: (inputPath: Path) => dtsState.delete(inputPath),
  };
};
