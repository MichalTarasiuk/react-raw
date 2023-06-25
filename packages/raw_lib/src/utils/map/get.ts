/* eslint-disable functional/prefer-readonly-type */
import invariant from 'invariant';

export const mapGet = <Value, Property>(
  map: Map<Property, Value>,
  property: Property
) => {
  if (map.has(property)) {
    const value = map.get(property);

    invariant(value, 'value is not defined');

    return value;
  }

  return null;
};
