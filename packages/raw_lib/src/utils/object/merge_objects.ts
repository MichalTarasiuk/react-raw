export const mergeObjects = <
  Object1 extends Record<PropertyKey, unknown>,
  Object2 extends Record<PropertyKey, unknown>
>(
  object1: Object1,
  object2: Object2
) => ({...object1, ...object2});
