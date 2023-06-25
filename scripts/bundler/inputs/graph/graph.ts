import {union} from '@react-raw/lib/source';

import {packageJSONFiles} from '../package_jsons/package_jsons_alias';

import {bundlerIsSupported} from './bundler_is_supported';
import {getReactRawDependencies} from './get_react_raw_dependencies';

export type Graph = Record<string, readonly string[]>;

export const graph = packageJSONFiles.reduce<Graph>(
  (collector, packageJSONFile) => {
    if (!bundlerIsSupported(packageJSONFile)) {
      return collector;
    }

    const {name, dependencies, devDependencies} = packageJSONFile;

    const allDependencies = union(
      Object.keys(dependencies ?? {}),
      Object.keys(devDependencies ?? {})
    );

    collector[name] = getReactRawDependencies(allDependencies);

    return collector;
  },
  {}
);
