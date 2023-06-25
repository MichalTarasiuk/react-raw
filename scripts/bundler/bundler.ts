import {createEventHub} from '@react-raw/lib/source';
import {blockThread, unlockThread} from '@react-raw/lib/source/node';

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
  await Promise.all(
    Object.entries(graph).map(async ([packageJSONName, dependencies]) => {
      await waitForDependencies(dependencies);

      await runDev(packageJSONName);

      bundlerEventHub.emit(packageJSONName);
    })
  );

  unlockThread();
};

void bundler();
