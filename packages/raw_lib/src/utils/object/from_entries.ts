/* eslint-disable @typescript-eslint/consistent-type-assertions */

export const fromEntries = <
  Entries extends ReadonlyArray<readonly [PropertyKey, unknown]>
>(
  entries: Entries
) =>
  Object.fromEntries(entries) as Record<Entries[number][0], Entries[number][1]>;
