const path = require('path');
const reactus =  require('../src');
//shim the reactus package. only needed for testing
reactus.shim();

let example = 'quick-start/src/server';
if (process.argv.length === 3) {
  example = process.argv[2];
}

const environment = path.join(__dirname, '../examples', example + '.js')
require(environment);
