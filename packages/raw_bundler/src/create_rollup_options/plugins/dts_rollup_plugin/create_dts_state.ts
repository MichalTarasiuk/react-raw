import {relativeToAbsolute} from '@react-raw/lib/source/node';
import {dirname} from 'node:path';

import {isRootFile} from './is_root_file';

import type {DtsOptions} from './generate_dts_bundle';

type Input = string;

type DtsItem = {
  readonly dtsOptions: DtsOptions;
  readonly test: (absoluteInput: string) => boolean;
};

export const createDtsState = (root: string) => {
  const dtsState = new Map<Input, DtsItem>();

  const get = (changedFile: string) => {
    return [...dtsState.values()].find((dtsItem) => dtsItem.test(changedFile));
  };

  const set = (dtsOptions: DtsOptions) => {
    const dtsItem: DtsItem = {
      dtsOptions,
      test: (changedFile) => {
        const absoluteInput = relativeToAbsolute(dtsOptions.input);

        if (isRootFile(root, dtsOptions.input)) {
          return changedFile === absoluteInput;
        }

        const absoluteInputDirname = dirname(absoluteInput);

        return changedFile.startsWith(absoluteInputDirname);
      },
    };

    dtsState.set(dtsOptions.input, dtsItem);
  };

  return {
    get,
    set,
    has: (input: Input) => dtsState.has(input),
    delete: (input: Input) => dtsState.delete(input),
  };
};
