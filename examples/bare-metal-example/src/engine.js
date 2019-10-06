import path from 'path'
import reactus from 'reactus'

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

const engine = reactus()

//add params
engine.set('label', 'bare_metal');
engine.set('page', path.join(__dirname, 'client/Page.jsx'))
engine.set('source', 'babel', path.join(__dirname, '../.babelrc'))

engine.set('path', 'view', 'node_modules/{LABEL}/bare_views/{PATH}.jsx');
engine.set('path', 'routes', 'node_modules/{LABEL}/bare_routes.js');
engine.set('path', 'component', 'node_modules/{LABEL}/bare_components/{NAME}.jsx');

//add commponents
engine.component('Link', path.join(__dirname, 'client/components/Link.jsx'))

//add views
engine.view('/', '/home', path.join(__dirname, 'client/views/Home.jsx'))
engine.view('/product/:id', '/product/detail', path.join(__dirname, 'client/views/Product.jsx'))

//this is the react server side render function
engine.render = function(res, path, props = {}, pageProps = {}, page = null) {
  //remove forward slash at the start
  if (path.indexOf('/') === 0) {
    path = path.substr(1)
  }

  //setup page
  page = page || this.page;

  //if no browser path
  if (!this.registry.has('views', path)) {
    //Can't do anything
    throw new Error('Path ' + path + ' does not have a view');
  }

  //get the view
  let view = require(this.registry.get('views', path).view);
  if (typeof view === 'object' && view.default) {
    view = view.default
  }

  //if view is a react component
  if (view.prototype && !!view.prototype.isReactComponent) {
    //convert the view to a composite
    const original = view;
    view = function componentToComposite(props) {
      return React.createElement(original, props);
    }
  }

  if (!page) {
    res.send(renderToString(view(props)));
    return this;
  }

  //component should be a composite, make a page
  const html = React.createElement(page, pageProps);

  //last set the content
  res.send('<!DOCTYPE html>' + renderToStaticMarkup(html)
    .replace('{APP}', renderToString(view(props)))
    .replace('{DATA}', JSON.stringify(props))
  );

  return this;
};

export default engine
