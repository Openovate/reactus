const VirtualEngine = require('./VirtualEngine');
const Helpers = require('./Helpers');
const DevpackMiddleware = require('./DevpackMiddleware');
const RequireResolver = VirtualEngine.RequireResolver;

function createVirtualEngine(config = {}) {
  return new createVirtualEngine.VirtualEngine(config);
}

createVirtualEngine.VirtualRegistry = function createVirtualRegistry(config = {}) {
  return new VirtualEngine.VirtualRegistry(config);
};

createVirtualEngine.VirtualEngine = VirtualEngine;
createVirtualEngine.RequireResolver = RequireResolver;
createVirtualEngine.devpack = DevpackMiddleware;
createVirtualEngine.shim = Helpers.shim;

module.exports = createVirtualEngine;
