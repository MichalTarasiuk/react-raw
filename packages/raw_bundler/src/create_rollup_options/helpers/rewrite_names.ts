const rewriteNamesObj: Record<string, string> = {
  '.': 'root',
};

export const rewriteNames = (record: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(record).map(
      ([key, value]) => [rewriteNamesObj[key] ?? key, value] as const
    )
  );
