import type {importNameToFormat} from './import_name_to_format';

type Format = ReturnType<typeof importNameToFormat>;

const formatToExtensionObj: Record<Format, string> = {
  cjs: 'cjs',
  esm: 'mjs',
};

export const formatToExtension = (format: Format) =>
  formatToExtensionObj[format];
