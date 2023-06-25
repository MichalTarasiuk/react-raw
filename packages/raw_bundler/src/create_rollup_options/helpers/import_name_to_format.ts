import type {SupportedImportName} from '../constants/constants_alias';

const format = {
  esm: 'esm',
  cjs: 'cjs',
} as const;

const importNameToFormatObj = {
  import: format.esm,
  require: format.cjs,
} satisfies Record<SupportedImportName, string>;

export const importNameToFormat = (supportedImportName: SupportedImportName) =>
  importNameToFormatObj[supportedImportName];
