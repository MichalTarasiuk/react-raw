require('ts-node').register({
  compilerOptions: {
    module: 'CommonJS',
  },
});

module.exports = require('./list_staged').lintStaged;
