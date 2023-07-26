import {readTypesVersions} from '@react-raw/bundler';

import type {PackageJsonFile} from '../../../inputs/inputs_alias';

const isDeclarationFile = (file: string) => file.endsWith('.d.ts');

export const getDeclarationFiles = (packageJsonFile: PackageJsonFile) => {
  const typesVersions = readTypesVersions(packageJsonFile);

  return Object.values(typesVersions).filter(isDeclarationFile);
};
