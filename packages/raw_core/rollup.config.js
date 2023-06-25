require('ts-node').register({
  compilerOptions: {
    module: 'CommonJS',
  },
  files: ['./node_modules/@react-raw/lib/src/types/**/*.d.ts'],
});

module.exports = require('./rollup.config.ts');
