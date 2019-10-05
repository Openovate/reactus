const fs = require('fs');
const path = require('path');
const VirtualEngine = require('../../src/VirtualEngine');

test('registry, files and sources test', () => {
  const engine = new VirtualEngine();

  const linkSourcePath = path.resolve(__dirname, 'assets/Link.jsx');
  const linkTargetPath = 'node_modules/reactus/components/Link.jsx';

  const productSourcePath = path.resolve(__dirname, 'assets/Product.jsx');
  const productTargetPath = 'node_modules/reactus/views/product/detail.jsx';

  engine.view('/product/:id', '/product/detail', productSourcePath);
  engine.component('Link', linkSourcePath);

  const view = engine.registry.get('views', 'product/detail');
  expect(view.route).toBe('/product/:id');
  expect(view.view).toBe(productSourcePath);

  expect(engine.sources[linkTargetPath]).toBe(linkSourcePath);
  expect(engine.sources[productTargetPath]).toBe(productSourcePath);

  expect(
    engine.files[productTargetPath].toString()
  ).toBe(
    fs.readFileSync(productSourcePath).toString()
  );

  expect(
    engine.files[linkTargetPath].toString()
  ).toBe(
    fs.readFileSync(linkSourcePath).toString()
  );
})
