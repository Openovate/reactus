# Reactus Bare Metal Example

Based on the [Quick Start Example](https://github.com/Openovate/reactus/tree/master/examples/quick-start-example),
this example shows how to use `reactus` for tooling purposes. This example uses
the following external libraries.

 - `babel` - Used to transform ESM and JSX to common JS on the server side
 - `react` - Used to process components and views
 - `webpack` - Used to transform ESM and JSX to common JS on the client side

The example is structured like the following where `[ROOT]` is denoted as your
project root.

```
[ROOT]
|- src/
   |- client/
      |- components/
         |- Link.jsx
      |- views/
         |- Home.jsx
         |- Product.jsx
   |- engine.js
   |- server.js
|- .babelrc
|- package.json
|- webpack.config.js
```

You can view the files of this example
[here](https://github.com/Openovate/reactus/tree/master/examples/bare-metal-example).
If you copy the full example on your local computer you just need to run the
following command in terminal `$ cd [ROOT] && npm i && npm start`.

The goals of this project are the following.

 - [1. Have Full Control of the Webpack Entry File](#1-have-full-control-of-the-webpack-entry-file)
 - [2. Have Full Control of the Client Side Routing](#2-have-full-control-of-the-client-side-routing)
 - [3. Change the Module Name to `bare_metal`](#3-change-the-module-name-to-bare_metal)
 - [4. Change the Default Pathing for Routes, Components and Views](#4-change-the-default-pathing-for-routes-comonents-and-views)
 - [5. Have Full Control of the Server Side Routing](#5-have-full-control-of-the-server-side-routing)

### 1. Have Full Control of the Webpack Entry File

Open `[ROOT]/webpack.config.js` and change the entry to the following.

```js
//# FILE: [ROOT]/webpack.config.js
module.exports = {
  ...
  entry: {
    index: [
      'webpack-hot-middleware/client?reload=true',
      '[ROOT]/src/client/entry.js'
    ]
  },
  ...
};
```

So instead of webpack using the virtual file `reactus/entry.js`, it will your
actual project entry file. Create a file called `[ROOT]/src/client/entry.js`
with the following contents.

```js
//# FILE: [ROOT]/src/client/entry.js
import '@babel/polyfill';
import ReactDOM from 'react-dom';
import routes from 'bare_metal/bare_routes';
import createRouter from './Router.jsx';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

createRouter(history, routes, (Router, props) => {
  ReactDOM.hydrate(Router(props), document.getElementById('root'));
})
```

> NOTE: `react-dom` is already installed by `reactus`, but feel free to work
with the version you are comfortable in React 16.

`import createRouter from './Router.jsx'` is an actual router component will be
defined in the next section.

`import routes from 'bare_metal/bare_routes'` is a virtual file that returns a
json version of the routes also will be discussed later.

## 2. Have Full Control of the Client Side Routing

Create a file called `[ROOT]/src/client/Router.jsx` with the contents from
[the example router](https://github.com/Openovate/reactus/tree/master/examples/bare-metal-example/src/client/Router.jsx).
The following skeleton is provided because the actual router file is too big to
paste and explain.


```js
//# FILE: [ROOT]/src/client/Router.jsx
import path from 'path';
import React from 'react';
import pathToRegexp from 'path-to-regexp';

/**
 * Let's base the React router from an actual router class
 */
class Router {
  /**
   * Adds the pre defined routes
   *
   * @param {Object} routes
   */
  constructor(routes) {
    ...
  }

  /**
   * Tries to match a route with the given path
   *
   * @param {String} path
   *
   * @return {(Object|false)}
   */
  match(path) {
    ...
  }

  /**
   * Matches the path and imports the view
   *
   * @param {String} path
   * @param {Function} callback
   *
   * @return {(Object|false)}
   */
  route(path, callback) {
    ...
  }
}

/**
 * Now let's create a react version of the router
 */
class ReactRouter extends React.Component {
  /**
   * Set the router from above
   *
   * @param {Object} props
   */
  constructor(props) {
    ...
  }

  /**
   * Tries to call on getInitialProps() which is optionally defined
   * in a component, then will set the state based on those props,
   *
   * @param {Object} route
   * @param {(Component|Null)} component
   */
  handleComponent(route, component) {
    ...
  }

  /**
   * Maps the history path with what the router is expecting then
   * redirects routing to handleComponent()
   *
   * @param {Object} location
   */
  handleRoute(location) {
    ..
  }

  /**
   * React's expected render method
   *
   * @return {(Component|Null)}
   */
  render() {
    ...
  }
}

/**
 * The reason why this is patterned like this is because of the
 * asyncronous nature of import(). We can't just call hydrate without
 * the component file being loaded. We created a wrapper to wait for
 * the initial component view to be loaded before we call hydrate
 *
 * @param {History} history
 * @param {Object} routes
 * @param {Function} callback
 */
export default function createRouter(history, routes, callback) {
  ...
}
```

> NOTE: `path-to-regexp` is already installed by `reactus`.

The reason why we use a custom router vs `react-router` is to consider code
splitting by using dynamic imports like
`import(`bare_metal/views/${route.file}.jsx`).then(...)` which requires an
extra step *(ie, more tooling)* to get it working. Once you have the router
provided by `reactus` in your project folder, you should understand that you
are free to define the router anyway that is desired.

### 3. Change the Module Name to `bare_metal`

Open the [engine file](https://github.com/Openovate/reactus/tree/master/examples/bare-metal-example/src/engine.js)
*(`[ROOT]/src/engine.js`)* and add the following code.

```js
//# FILE: [ROOT]/src/engine.js
...
const engine = reactus()
...
//add params
engine.set('label', 'bare_metal');
...
export default engine
```

### 4. Change the Default Pathing for Routes, Components and Views

Open the [engine file](https://github.com/Openovate/reactus/tree/master/examples/bare-metal-example/src/engine.js)
*(`[ROOT]/src/engine.js`)* and add the following code.

```js
//# FILE: [ROOT]/src/engine.js
...
const engine = reactus()
...
//add params
engine.set('path', 'view', 'node_modules/{LABEL}/bare_views/{PATH}.jsx');
engine.set('path', 'routes', 'node_modules/{LABEL}/bare_routes.js');
engine.set('path', 'component', 'node_modules/{LABEL}/bare_components/{NAME}.jsx');

...
export default engine
```

If you remember in `[ROOT]/src/client/entry.js`, routes are imported by
`import routes from 'bare_metal/bare_routes'`. Adding
`engine.set('path', 'routes', 'node_modules/{LABEL}/bare_routes.js')` in your
engine file is how that import path was generated. The same would be implied
with views and routes.

### 5. Have Full Control of the Server Side Routing

Open the [engine file](https://github.com/Openovate/reactus/tree/master/examples/bare-metal-example/src/engine.js)
*(`[ROOT]/src/engine.js`)* and add the following code.

```js
//# FILE: [ROOT]/src/engine.js
...
const engine = reactus()
...
engine.render = function(res, path, props = {}, pageProps = {}, page = null) {
  //your custom way
}
...
export default engine
```

### 5. Manually setup `webpack-dev-middleware` and `webpack-hot-middleware`

Open the [server file](https://github.com/Openovate/reactus/tree/master/examples/bare-metal-example/src/server.js)
*(`[ROOT]/src/server.js`)* and add the following code.


```js
//# FILE: [ROOT]/src/server.js
...
import config from '../webpack.config'
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware'
import webpackHot from 'webpack-hot-middleware'

const app = express()

//add webpack dev and hot
const compiler = webpack(config);
app.use(webpackDev(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(webpackHot(compiler))
```
