import type {Graph} from './graph';

export const hasCyclicDependency = (graph: Graph) => {
  const entriesGraph = Object.entries(graph);

  entriesGraph.forEach(([packageName, dependencies]) => {
    for (const dependency of dependencies) {
      if (!graph[dependency].includes(packageName)) {
        continue;
      }

      throw Error(`cyclic dependency detected: ${packageName}, ${dependency}`);
    }
  });
};
