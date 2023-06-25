import {packageJSONFiles} from '../package_jsons/package_jsons_alias';

import {bundlerIsSupported} from './bundler_is_supported';

const REACT_RAW_DEPENDENCY_PREFIX = '@react-raw';

const isReactRawDependency = (dependency: string) =>
  dependency.startsWith(REACT_RAW_DEPENDENCY_PREFIX);

export const getReactRawDependencies = (dependencies: readonly string[]) => {
  return dependencies.filter((dependency) => {
    if (!isReactRawDependency(dependency)) {
      return false;
    }

    const dependencyPackageJSONFile = packageJSONFiles.find(
      (packageJSONFile) => packageJSONFile.name === dependency
    );

    if (!dependencyPackageJSONFile) {
      return false;
    }

    return bundlerIsSupported(dependencyPackageJSONFile);
  });
};
