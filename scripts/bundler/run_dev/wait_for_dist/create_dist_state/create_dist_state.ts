import {identity} from '@react-raw/lib/source';
import {join} from 'node:path';

import {getDeclarationFiles} from './get_declaration_files';
import {getExportFiles} from './get_export_files/get_export_files';

import type {PackageJsonFile} from '~bundler/inputs/inputs_alias';

export const createDistState = (
  packagePath: string,
  packageJsonFile: PackageJsonFile
) => {
  const exportFiles = getExportFiles(packageJsonFile);
  const declarationFiles = getDeclarationFiles(packageJsonFile);

  const distState = new Map(
    [...exportFiles, ...declarationFiles].map((file) => [
      join(packagePath, file),
      false,
    ])
  );

  const setAsCreated = (createdFile: string) => {
    distState.set(createdFile, true);
  };

  const allFilesAreCreated = () => {
    return [...distState.values()].every(identity);
  };

  return {
    setAsCreated,
    allFilesAreCreated,
  };
};
