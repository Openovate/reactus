const fs = require('fs');
const path = require('path');

const Module = require('module');
const babel = require('@babel/core');
const requireFromString = require('require-from-string');

const VirtualEngine = require('../../src/VirtualEngine');
const RequireResolver = require('../../src/RequireResolver');

test('babel transform test', () => {
  const engine = new VirtualEngine;

  const expectedCode = fs.readFileSync(path.resolve(__dirname, 'assets/Link.js'));
  const content = fs.readFileSync(path.resolve(__dirname, 'assets/Link.jsx'));
  const { code } = babel.transform(content, engine.presets);

  expect(code.toString().trim()).toBe(expectedCode.toString().trim());
})

test('resolve test', () => {
  const target = 'node_modules/mock_module/fixture.js';
  const source = path.resolve(__dirname, 'assets/fixture.js');
  const engine = new VirtualEngine();
  engine.set('map', target, source);
  const resolver = new RequireResolver(engine, Module._resolveFilename);
  const actual = resolver.resolve('mock_module/fixture', module.parent);

  expect(actual).toBe(path.join(__dirname, '../../../mock_module/fixture.js'))
})
