import {packageJsonFiles} from '../package_jsons/package_jsons_alias';

import {hasDevCommand} from './has_dev_command';

const REACT_RAW_DEPENDENCY_PREFIX = '@react-raw';

const isReactRawDependency = (dependency: string) =>
  dependency.startsWith(REACT_RAW_DEPENDENCY_PREFIX);

export const getRollupReactRawDependencies = (
  dependencies: readonly string[]
) => {
  return dependencies.filter((dependency) => {
    if (!isReactRawDependency(dependency)) {
      return false;
    }

    const packageJsonFile = packageJsonFiles.find(
      (packageJsonFile) => packageJsonFile.name === dependency
    );

    return packageJsonFile && hasDevCommand(packageJsonFile);
  });
};
