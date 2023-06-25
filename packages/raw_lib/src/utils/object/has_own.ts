export const hasOwn = <
  UnknownObject extends Record<PropertyKey, unknown>,
  Property extends PropertyKey
>(
  unknownObject: UnknownObject,
  property: Property
): unknownObject is UnknownObject & Record<Property, unknown> =>
  Object.hasOwn(unknownObject, property);
