import type {readTypesVersions} from '../../../helpers/helpers_alias';

export const findTypeVersion = (
  typeVersions: ReturnType<typeof readTypesVersions>,
  name: string
) => {
  const [_, value] =
    Object.entries(typeVersions).find(
      ([typeVersionName]) => typeVersionName === name
    ) ?? [];

  return value;
};
