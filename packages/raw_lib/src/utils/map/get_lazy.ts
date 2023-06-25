/* eslint-disable functional/prefer-readonly-type */
import invariant from 'invariant';

export const mapGetLazy = <Property, Value>(
  map: Map<Property, Value>,
  property: Property,
  lazyValue: (property: Property) => Value
) => {
  if (!map.has(property)) {
    const value = lazyValue(property);

    map.set(property, value);
  }

  const value = map.get(property);

  invariant(value, 'value is not defined');

  return value;
};
