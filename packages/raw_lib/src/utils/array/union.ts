export const union = <
  ArrayA extends ReadonlyArray<unknown>,
  ArrayB extends ReadonlyArray<unknown>
>(
  arrayA: ArrayA,
  arrayB: ArrayB
) => [...new Set([...arrayA, ...arrayB])];
