import {generateDtsBundle as generateDtsBundleImpl} from 'dts-bundle-generator';
import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

export type DtsOptions = {
  readonly input: string;
  readonly output: string;
};

export const generateDtsBundle = (
  tsconfigJSONPath: string,
  dtsOptionsArray: readonly DtsOptions[]
) => {
  const inputs = dtsOptionsArray.map(({input}) => input);
  const outputs = dtsOptionsArray.map(({output}) => output);

  const codes = generateDtsBundleImpl(
    inputs.map((filePath) => {
      return {
        filePath,
        output: {
          sortNodes: true,
          noBanner: true,
          exportReferencedTypes: false,
        },
      };
    }),
    {
      preferredConfigPath: tsconfigJSONPath,
    }
  );

  codes.forEach((code, index) => {
    const output = outputs.at(index);

    if (output) {
      const outputDirname = dirname(output);
      const outputDirnameExist = existsSync(outputDirname);

      !outputDirnameExist &&
        mkdirSync(outputDirname, {
          recursive: true,
        });

      writeFileSync(output, code);
    }
  });
};
