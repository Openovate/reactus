const fs = require('fs');
const path = require('path');

const babel = require('@babel/core');
const requireFromString = require('require-from-string');

const { VirtualEngine, RequireResolver } = require('../../src/');

test('resolve test', () => {
  const target = 'node_modules/mock_module/fixture.js';
  const source = path.resolve(__dirname, 'assets/fixture.js');
  const engine = new VirtualEngine();
  engine.set('map', target, source);
  const resolver = RequireResolver.load();
  const actual = resolver.resolve('mock_module/fixture', module.parent);

  expect(actual).toBe(path.join(__dirname, '../../../mock_module/fixture.js'))
})
