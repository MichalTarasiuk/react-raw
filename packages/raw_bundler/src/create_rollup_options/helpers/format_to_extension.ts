import type {importNameToFormat} from './import_name_to_format';

type Format = ReturnType<typeof importNameToFormat>;

const formatToExtensionObj: Record<Format, string> = {
  cjs: 'js',
  esm: 'module.js',
};

export const formatToExtension = (format: Format) =>
  formatToExtensionObj[format];
