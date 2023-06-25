import {supportedImportNames} from '@react-raw/bundler';

import type {SupportedImportName} from '@react-raw/bundler';

export const isSupportedImportName = (
  importName: string
): importName is SupportedImportName => {
  const unknownSupportedImportNames: readonly string[] = supportedImportNames;

  return unknownSupportedImportNames.includes(importName);
};
