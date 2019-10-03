const Engine = require('./Engine');

function createEngine(config = {}) {
  return new createEngine.Engine(config);
}

createEngine.Engine = Engine;

module.exports = createEngine;
