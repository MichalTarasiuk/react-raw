import {createEventHub, blockThread, unlockThread} from '@react-raw/lib/source';

import {graph} from './inputs/inputs_alias';
import {runDev} from './run_dev/run_dev';

type BundlerEventHub = typeof bundlerEventHub;

type Subscriber = ReturnType<BundlerEventHub['on']>;

blockThread();

const bundlerEventHub = createEventHub();

const waitForDependencies = (dependencies: readonly string[]) => {
  return Promise.all(
    dependencies.map((dependency) => {
      return new Promise((resolve) => {
        let subscriber: Subscriber | null = null;

        const listener = () => {
          resolve(null);

          subscriber?.off();
        };

        subscriber = bundlerEventHub.on(dependency, listener);
      });
    })
  );
};

const bundler = async () => {
  const entriesGraph = Object.entries(graph);

  await Promise.all(
    entriesGraph.map(async ([packageJsonName, dependencies]) => {
      await waitForDependencies(dependencies);

      await runDev(packageJsonName);

      bundlerEventHub.emit(packageJsonName);
    })
  );

  unlockThread();
};

void bundler();
