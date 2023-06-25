import type {createRollupOptions} from './src_alias';

type CommandLineArguments = {
  readonly watch?: boolean;
};

type EnvironmentArguments = {
  readonly isProduction: boolean;
};

export const environment = (
  environmentFn: (
    environmentArguments: EnvironmentArguments
  ) => ReturnType<typeof createRollupOptions>
) => {
  return ({watch}: CommandLineArguments) => {
    const isProduction = !watch;

    return environmentFn({isProduction});
  };
};
