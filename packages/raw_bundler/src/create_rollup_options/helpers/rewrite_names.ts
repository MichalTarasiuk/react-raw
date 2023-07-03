const rewriteNamesObj: Record<string, string> = {
  '.': 'root',
};

export const rewriteNames = (record: Record<string, string>) => {
  const recordEntries = Object.entries(record).map(
    ([key, value]) => [rewriteNamesObj[key] ?? key, value] as const
  );

  return Object.fromEntries(recordEntries);
};
