const rewriteNamesObj: Record<string, string> = {
  '.': 'root',
};

export const rewriteNames = (packageJSONObject: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(packageJSONObject).map(
      ([key, value]) => [rewriteNamesObj[key] ?? key, value] as const
    )
  );
