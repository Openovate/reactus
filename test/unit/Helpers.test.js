const { merge, walk, shim } = require('../../src/helpers');

test('merge test', () => {
  const destination = {};
  const source1 = { some: { thing: 'good'}, one: 'bad'};
  const source2 = { some: { thing: 'bad'}, else: 'good'};

  const actual = merge(destination, source1, source2);

  expect(actual).toBe(destination);
  expect(actual.some.thing).toBe('bad');
  expect(actual.one).toBe('bad');
  expect(actual.else).toBe('good');

  expect(source1.some.thing).toBe('good');
  expect(source1.one).toBe('bad');
  expect(source1.else).toBe(undefined);

  expect(source2.some.thing).toBe('bad');
  expect(source2.else).toBe('good');
  expect(source2.one).toBe(undefined);
})

test('walk test', () => {
  const files = [];
  walk(__dirname + '/assets', (file) => {
    files.push(file);
  });

  expect(files.indexOf(__dirname + '/assets/Link.js') !== -1).toBe(true);
  expect(files.indexOf(__dirname + '/assets/Link.jsx') !== -1).toBe(true);
  expect(files.indexOf(__dirname + '/assets/Product.jsx') !== -1).toBe(true);
  expect(files.indexOf(__dirname + '/assets/dependency.js') !== -1).toBe(true);
  expect(files.indexOf(__dirname + '/assets/fixture.js') !== -1).toBe(true);
  expect(files.indexOf(__dirname + '/assets/recurse/note.txt') !== -1).toBe(true);
})

test('shim test', () => {
  shim('shimmy_ya');
  //const actual = require('shimmy_ya');
  //expect(typeof actual).toBe('function');
})
