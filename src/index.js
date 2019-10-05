const VirtualEngine = require('./VirtualEngine');
const Helpers = require('./Helpers');
const DevpackMiddleware = require('./DevpackMiddleware');

function createVirtualEngine(config = {}) {
  return new createVirtualEngine.VirtualEngine(config);
}

createVirtualEngine.VirtualEngine = VirtualEngine;
createVirtualEngine.devpack = DevpackMiddleware;
createVirtualEngine.shim = Helpers.shim;

module.exports = createVirtualEngine;
