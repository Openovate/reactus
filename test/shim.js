const path = require('path');
const { shim } =  require('../dist');

//shim the reactus package. only needed for testing
shim();

let example = 'quick-start-example/src/server';
if (process.argv.length === 3) {
  example = process.argv[2];
}

const environment = path.join(__dirname, '../examples', example + '.js')
require(environment);
