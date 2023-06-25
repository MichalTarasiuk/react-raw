import type {Graph} from './graph';

export const hasCyclicDependency = (graph: Graph) => {
  Object.entries(graph).forEach(([packageName, dependencies]) => {
    for (const dependency of dependencies) {
      if (!graph[dependency].includes(packageName)) {
        continue;
      }

      throw Error(`cyclic dependency detected: ${packageName}, ${dependency}`);
    }
  });
};
