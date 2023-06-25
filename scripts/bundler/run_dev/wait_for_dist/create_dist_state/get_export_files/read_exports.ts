import {importNameToFormat} from '@react-raw/bundler';
import {
  entries,
  hasOwn,
  fromEntries,
  isObject,
  isString,
} from '@react-raw/lib/source';
import {basename} from 'node:path';

import {isSupportedImportName} from './is_supported_import_name';

import type {JsonObject} from 'type-fest';

const getExportEntryValue = (
  root: string,
  exportValue: Record<PropertyKey, unknown>
) => {
  const exportValueEntries = entries(exportValue).flatMap(
    ([importName, pathname]) => {
      const isDistFile = isString(pathname) && !pathname.startsWith(root);

      if (
        isDistFile &&
        isString(importName) &&
        isSupportedImportName(importName)
      ) {
        return [[importNameToFormat(importName), pathname] as const];
      }

      return [];
    }
  );

  return fromEntries(exportValueEntries);
};

export const readExports = (root: string, jsonObject: JsonObject) => {
  if (!(hasOwn(jsonObject, 'exports') && isObject(jsonObject.exports))) {
    return {};
  }

  const exportsEntries = entries(jsonObject.exports).flatMap(
    ([exportKey, exportValue]) => {
      if (!isObject(exportValue)) {
        return [];
      }

      return [
        [
          basename(String(exportKey)),
          getExportEntryValue(root, exportValue),
        ] as const,
      ];
    }
  );

  return Object.fromEntries(exportsEntries);
};
