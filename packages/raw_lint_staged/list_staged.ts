export const lintStaged = {
  '*': ['pnpm run format'],
  '*.(ts|tsx)': ['pnpm run typecheck'],
};
