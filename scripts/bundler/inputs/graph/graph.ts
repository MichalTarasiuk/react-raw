import {union} from '@react-raw/lib/source';

import {packageJsonFiles} from '../package_jsons/package_jsons_alias';

import {getRollupReactRawDependencies} from './get_rollup_react_raw_dependencies';
import {hasDevCommand} from './has_dev_command';

export type Graph = Record<string, readonly string[]>;

export const graph = packageJsonFiles.reduce<Graph>(
  (collector, packageJsonFile) => {
    if (!hasDevCommand(packageJsonFile)) {
      return collector;
    }

    const {name, dependencies, devDependencies} = packageJsonFile;

    const allDependencies = union(
      Object.keys(dependencies ?? {}),
      Object.keys(devDependencies ?? {})
    );

    collector[name] = getRollupReactRawDependencies(allDependencies);

    return collector;
  },
  {}
);
