import {waitForDist} from './wait_for_dist/wait_for_dist';

export const runDev = async (packageName: string) => {
  const {$} = await import('zx');

  $`pnpm --filter ${packageName} dev`;

  return waitForDist(packageName);
};
