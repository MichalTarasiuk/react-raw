const inferType = (operand: unknown, exact = false) => {
  const type = typeof operand;

  if (type !== 'object' && !exact) {
    return type;
  }

  const exactType = Object.prototype.toString
    .call(operand)
    .replace(/^\[object (\S+)\]$/, '$1');

  return exactType.toLowerCase();
};

export const isObject = (
  operand: unknown
): operand is Record<PropertyKey, unknown> =>
  inferType(operand, true) === 'object';

export const isString = (operand: unknown): operand is string =>
  inferType(operand) === 'string';

export const isNumber = (operand: unknown): operand is number =>
  inferType(operand) === 'number';

export const isArray = (operand: unknown): operand is ReadonlyArray<unknown> =>
  inferType(operand) === 'array';

export const isBoolean = (operand: unknown): operand is boolean =>
  inferType(operand) === 'boolean';
