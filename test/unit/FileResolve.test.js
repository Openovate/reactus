const { FileResolve } = require('../../src/');

test('set, is and get test', () => {
  const resolved = new FileResolve;
  expect(resolved.isResolved()).toBe(false);

  resolved.set('foo', 'bar');
  expect(resolved.isResolved()).toBe(true);

  const { file, exports } = resolved.get();
  expect(file).toBe('foo');
  expect(exports).toBe('bar');
})
