const fs = require('fs');
const path = require('path');
const reactus = require('../../src');

test('registry, files and sources test', () => {
  const registry = reactus.VirtualRegistry();

  const linkSourcePath = path.resolve(__dirname, 'assets/Link.jsx');
  const linkTargetPath = 'node_modules/reactus/components/Link.jsx';

  const productSourcePath = path.resolve(__dirname, 'assets/Product.jsx');
  const productTargetPath = 'node_modules/reactus/views/product/detail.jsx';

  registry.view('/product/:id', '/product/detail', productSourcePath);
  registry.component('Link', linkSourcePath);

  const view = registry.get('views', 'product/detail');
  expect(view.route).toBe('/product/:id');
  expect(view.view).toBe(productSourcePath);
})
