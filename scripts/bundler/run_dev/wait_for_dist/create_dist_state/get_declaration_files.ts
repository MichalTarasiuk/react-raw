import {readSource, readTypesVersions} from '@react-raw/bundler';
import {filterObject} from '@react-raw/lib/source';

import type {PackageJSONFile} from '~bundler/inputs/inputs_alias';

export const getDeclarationFiles = (packageJSONFile: PackageJSONFile) => {
  const source = readSource(packageJSONFile);

  const typesVersions = readTypesVersions(packageJSONFile);
  const filteredTypesVersions = filterObject(typesVersions, (key) =>
    Object.hasOwn(source, key)
  );

  return Object.values(filteredTypesVersions);
};
