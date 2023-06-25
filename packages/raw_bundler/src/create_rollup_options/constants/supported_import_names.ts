type SupportedImportNames = typeof supportedImportNames;

export type SupportedImportName = SupportedImportNames[number];

export const supportedImportNames = ['import', 'require'] as const;
