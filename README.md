# Reactus

An un-opinionated, un-routed version of a **React** app build engine. There are
many great React frameworks, most notably [Next.js](https://nextjs.org/) and
[Razzle](https://github.com/jaredpalmer/razzle) each helping developers setup
their React app faster than traditional tooling. Reactus is a
**lite** version of a React framework, focused on generating bundles via
**Webpack**.

Use **Reactus** if:

 - You want to define your own custom file structure
 - You want to modularize your React project
 - You want to create your own React framework
 - You have an existing Express or Webpack based project
 - You have spent an exhaustive amount of time looking at Webpack's code.
 - You like to work with bare metal libraries

Do not use **Reactus** if:

 - You want an out of box full stack solution
 - You want a Zero config framework
 - You use/d `create-react-app` for your project

## Navigation

 - 1. [Install](#1-install)
 - 2. [Usage](#2-usage)
   - 2.1. [Example Project](#21-example-project)
     - 2.1.1. [Create an Engine File](#211-create-an-engine-file)
     - 2.1.2. [Create an Webpack Config](#212-create-a-webpack-config)
     - 2.1.3. [Create a Babel Config](#213-create-a-babel-config)
     - 2.1.4. [Create a Page Layout](#214-create-a-page-layout)
     - 2.1.5. [Create a Link Component](#215-create-a-link-component)
     - 2.1.6. [Create Views](#216-create-views)
     - 2.1.7. [Create a Server File](#217-create-a-server-file)
     - 2.1.8. [Add Scripts to Package Configuration](#218-add-scripts-to-package-configuration)
     - 2.1.9. [Done](#219-done)
   - 2.2. [Building](#22-building)
   - 2.3. [Customizing](#23-customizing)
     - 2.3.1. [Use a Custom Entry File](#231-use-a-custom-entry-file)
     - 2.3.2. [Use a Custom Router File](#232-use-a-custom-router-file)
     - 2.3.3. [White Labeling](#233-white-labeling)
     - 2.3.4. [Adding Custom Virtual Files](#234-adding-custom-virtual-files)
     - 2.3.5. [Not Using Express or Custom Router](#235-not-using-express-or-custom-router)

### 1. Install

```bash
$ npm i --save reactus
```

### 2. Usage

First thing to do is install packages that will transpile ESM modules, React
components, and essential webpack build tools.

```bash
$ npm i --save @babel/cli @babel/core @babel/node @babel/polyfill @babel/preset-env @babel/preset-react @babel/register react react-dom webpack webpack-cli history express
```

```bash
$ npm i --save-dev babel-loader webpack-dev-middleware webpack-hot-middleware
```

#### 2.1. Example Project

While, Reactus is un-opinionated, for these next sections we are
going to create a file structure that looks similar to the following and
`[ROOT]` is denoted as your project root.

```
[ROOT]
|- components/
   |- Link.jsx
   |- Page.jsx
|- views/
   |- Home.jsx
   |- Product.jsx
|- engine.js
|- server.js
|- .babelrc
|- package.json
|- webpack.config.js
```

##### 2.1.1. Create an Engine File

Create a file called `[ROOT]/engine.js` with the following contents.

```js
//#FILE: [ROOT]/engine.js
import path from 'path'
import Reactus from 'reactus'
import config from './webpack.config'
import Page from './components/Page.jsx'

const engine = Reactus()

//add params
engine.set('webpack', config)
engine.set('page', Page)

//add components
engine.component('Link', path.join(__dirname, 'components/Link.jsx'))

//add views
engine.view('/', '/home', path.join(__dirname, 'views/Home.jsx'))
engine.view('/product/:id', '/product/detail', path.join(__dirname, 'views/Product.jsx'))

export default engine
```

###### 2.1.1.1. Parameters

We instantiate the `engine` using `Reactus()`. Next, we need to tell the
engine where to get the webpack config using `engine.set('webpack', config)`
and set the default page using `engine.set('page', Page)`.

###### 2.1.1.2. Components

Next, we need to declare all the components that will be used in the project.
`reactus` virtually builds a global component registry accessible only by views
using `import Link from 'reactus/components/Link.jsx'` for example.

> NOTE: `reactus/components/Link.jsx` is a virtual file that does not really exist.

The method `engine.component(name, path to source file)` is a function used to
register components where the following parameters are accepted.

 - **name** - the name of the component; use a standard file name format
 *(ie. no special character, spaces, etc.)*
 - **path to source file** - the actual place where the source code is located

###### 2.1.1.3. Views

Last, we need to declare all the views that will be used in the project.
`reactus` virtually builds a virtual file structure for views and be accessed
using `import Product from 'reactus/views/product/detail.jsx'` for example.

> NOTE: `reactus/views/product/detail.jsx` is a virtual file that does not really exist.

`engine.view(route, target, source)` is a function to register views where the
following parameters are accepted.

 - `route` - the route path that follows the standard
 [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)
 used by both [express](https://www.npmjs.com/package/express) and
 [react-router](https://www.npmjs.com/package/react-router).
 - `target` - The client side path where to place this view *(jsx)*
 - `source` - The actual place where the source code is found

> TIP: In this part of the project, this would be an ideal place to load your custom modules.

##### 2.1.2. Create a Webpack Config

Create a file called `[ROOT]/webpack.config.js` with the following contents.

```js
//#FILE: [ROOT]/webpack.config.js
const { join } = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      'reactus/entry.js'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: join(process.cwd(), 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] }
      },
      {
        test: /\.(js|jsx)$/,
        include: /node_modules\/reactus/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

We need to make sure in our config that there is a rule to transform the
`reactus` package by setting `include: /node_modules\/reactus/` as a module
rule. The next important thing to have is the `HotModuleReplacementPlugin()`.
This will allow re-bundling and reloads when you develop your project.

##### 2.1.3. Create a Babel Config

Create a file called `[ROOT]/.babelrc` with the following contents.

```json
{
  "presets": ["@babel/env", "@babel/preset-react"]
}
```

This tells both our server and client transpiler to transform ES modules and
JSX files to common JS before evaluating the code.

##### 2.1.4. Create a Page Layout

Create a file called `[ROOT]/components/Page.jsx` with the following contents.

```js
//#FILE: [ROOT]/components/Page.jsx
import React from 'react';

export default function Page(props) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </head>
      <body>
        <div id="root">{'{APP}'}</div>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <script id="react-data" type="text/json">{'{DATA}'}</script>
        <script src="/index.bundle.js"></script>
      </body>
    </html>
  );
}
```

This layout is registered in `[ROOT]/engine.js`, so whenever `render()` is
called and a layout is not provided, it will use this as default.

##### 2.1.5. Create a Link Component

Create a file called `[ROOT]/components/Link.jsx` with the following contents.

```js
//#FILE: [ROOT]/components/Link.jsx
import React from 'react';

export default function Link(props) {
  const { to, children } = props;
  props = { href: to, onClick: handle.bind(null, props) };
  return React.createElement('a', props, children);
}

function handle({ to, history, props }, event) {
  event.preventDefault();
  history.push(to, props || {});
  return false;
}
```

The `Link` component uses a `history` prop.
[History](https://www.npmjs.com/package/history) is used by the original
`react-router` library and the `reactus` Router relies on
[this](https://github.com/Openovate/reactus/blob/master/src/client/Router.jsx)
for client side rendering and will pass the `history` to all pages on load.

##### 2.1.6. Create Views

Create a file called `[ROOT]/views/Home.jsx` with the following contents.

```js
//#FILE: [ROOT]/views/Home.jsx
import React from 'react'
import Link from  'reactus/components/Link.jsx'

export default function Home(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <ul>
        <li><Link history={props.history} to="/">Home</Link></li>
        <li><Link history={props.history} to="/product/1">Product 1</Link></li>
        <li><Link history={props.history} to="/product/2">Product 2</Link></li>
      </ul>
    </div>
  )
}

Home.getInitialProps = async function getInitialProps() {
  const response = await fetch('http://localhost:3000/api/home')
  return await response.json() || {}
}
```

Remember that in `[ROOT]/engine.js`, this component was registered as a virtual
component. That is how it can be accessed like
`import Link from  'reactus/components/Link.jsx'`.

```js
//#FILE: [ROOT]/engine.js

...
//add components
engine.component('Link', path.join(__dirname, 'components/Link.jsx'))
...
```

The client side routing of `reactus` automatically calls on `Home.getInitialProps()`.
Here is where you should `fetch` data from the server assuming that it was not
already loaded.

Create another file called `[ROOT]/views/Product.jsx` with the following contents.

```js
//#FILE: [ROOT]/views/Product.jsx
import React from 'react'
import Link from  'reactus/components/Link.jsx'

export default function Product(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <ul>
        <li><Link history={props.history} to="/">Home</Link></li>
        <li><Link history={props.history} to="/product/1">Product 1</Link></li>
        <li><Link history={props.history} to="/product/2">Product 2</Link></li>
      </ul>
    </div>
  )
}

Product.getInitialProps = async function getInitialProps(route) {
  if (!route.params || !route.params.id) {
    return {}
  }

  const response = await fetch('http://localhost:3000/api/product/' + route.params.id)
  return await response.json() || {}
}
```

In the example of `Product.getInitialProps(route)`, you can alternatively accept
a `route` argument which has the meta information of the route path, in this
case of `route.params.id`.

##### 2.1.7. Create a Server File

Create a file called `[ROOT]/server.js` with the following contents.

```js
//#FILE: [ROOT]/server.js
import http from 'http'
import express from 'express'
import engine from './engine'

const app = express()

//use engine
app.use(engine.middleware())

//add API functions
function getHome() {
  return { title: 'Home Page' }
}

function getProduct(id) {
  return { title: `Product ${id}` }
}

//add routes
app.get('/', async(req, res) => {
  const props = getHome()
  const pageProps = { title: 'Welcome!' }

  res.setHeader('Content-Type', 'text/html')
  engine.render(res, '/home', props, pageProps)
})

app.get('/product/:id', async(req, res) => {
  const props = getProduct(req.params.id)
  const pageProps = { title: 'Product Detail' }

  res.setHeader('Content-Type', 'text/html')
  engine.render(res, '/product/detail', props, pageProps);
})

app.get('/api/home', (req, res) => {
  res.setHeader('Content-Type', 'text/json')
  res.send(getHome())
})

app.get('/api/product/:id', async(req, res) => {
  res.setHeader('Content-Type', 'text/json')
  res.send(getProduct(req.params.id))
})

//start http server
const server = http.createServer(app).listen(3000)
```

We include the engine into the app by `import engine from './engine'` and use it
by `app.use(engine.middleware())`.

After that, other typical routes are added. The following routes are provided as
examples on how to use the `engine.render()` method.

 - `app.get('/', async(req, res) => {})` - For `localhost:3000/`; Should load
 the home page with `[ROOT]/views/Home.jsx`

 - `app.get('/product/:id', async(req, res) => {})` - For `localhost:3000/product/2`;
 Should load the product page with `[ROOT]/views/Product.jsx`

 - `app.get('/api/home', async(req, res) => {})` - For `localhost:3000/api/home`;
 Example of a mock API call.

 - `app.get('/api/product/:id', async(req, res) => {})` - For `localhost:3000/api/product/2`;
 Example of a mock API call handing dynamic URL parameters.

`engine.render(response, view, props, pageProps, page)` - renders a registered
view where the following parameters are accepted.

 - `response` - The response object
 - `view` - The client side path where the registered view is located
 - `props` - The data object to pass as `props` to the component
 - `pageProps` - The data object to pass as `props` to the page component
 - `page` - Incase you want to a different page component on runtime

##### 2.1.8. Add Scripts to Package Configuration

In your `[ROOT]/package.json`, add the following scripts.

```js
{
  ...
  "scripts": {
    "start": "babel-node server.js"
  }
  ...
}
```

We use `babel-node` in this case to read from the `.babelrc` file to transform
both ES modules and react files to Common JS.

##### 2.1.9. Done

In terminal, navigate to `[ROOT]` and run `$ npm start`. Next visit
`http://localhost:3000/` in your browser. You should see something like the
following.

----

# Home Page

 - [Home](#)
 - [Product 1](#)
 - [Product 2](#)

---

If you click around you should notice that the views are navigating using client
side routing. If you try to view source and refresh a page you will confirm that
the views are also rendering on the server as well.

### 2.2. Building

At some point, you will want to build the client side bundles. Using the same
example project in `2.1. Example Project` create a file called `[ROOT]/build.js`
and add the following contents.

```js
//#FILE: [ROOT]/build.js
import engine from './engine'

engine.compile((err, stats) => {
  console.log('Done!', err)
})
```
Next, in your `[ROOT]/package.json`, add the following scripts.

```js
{
  ...
  "scripts": {
    "start": "babel-node server.js",
    "build": "babel-node build.js"
  }
  ...
}
```

In terminal, navigate to `[ROOT]` and run `$ npm run build`. You will notice a
new folder called `[ROOT]/build`. This folder will contain all the generated
bundles.

### 2.3. Customizing

This section will show how `reactus` can be changed to fit your project needs.

#### 2.3.1. Use a Custom Entry File

By default, `reactus` uses a pre-defined entry file that looks like the following.

```js
//#FILE: reactus/client/entry.js
import '@babel/polyfill';
import ReactDOM from 'react-dom';
import routes from 'reactus/routes';
import Router from 'reactus/Router.jsx';

const { createBrowserHistory } = require('history');
const history = createBrowserHistory();

ReactDOM.hydrate(
  Router(history, routes),
  document.getElementById('root')
)
```

You can change this with the following snippet of code.

```
//#FILE: [ROOT]/engine.js
...
engine.set('entry', '/absolute/path/to/your/entry/file.js')
...
```

#### 2.3.2. Use a Custom Router File

By default, `reactus` uses a pre-defined router file that looks like the
following.

```js
//#FILE: reactus/client/Router.jsx
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
    this.history = history;
    this.routes = routes;
  }

  /**
   * Tries to match a route with the given path
   *
   * @param {String} path
   *
   * @return {(Object|false)}
   */
  match(path) {
    const match = { args: [], keys: [], params: {} };

    for(const route in this.routes) {
      match.route = route;
      match.pattern = pathToRegexp(match.route, match.keys);
      match.results = match.pattern.exec(path);

      //if we found a match
      if (match.results && match.results.length) {
        break;
      }
    }

    //if no match was found
    if (!match.results || !match.results.length) {
      return false;
    }

    //match was found, let's add what we can find to match

    //full path
    match.path = match.results.shift();
    //this is to populate matched arguments and parameters
    match.results.forEach((variable, i) => {
      //if there is no key for this...
      if (!match.keys[i] || !match.keys[i].name) {
        return;
      }

      // if name a number
      if (typeof match.keys[i].name === 'number') {
        //it should be set as an argument
        match.args.push(variable);
        return;
      }

      //name is a string, set it as a parameter
      match.params[match.keys[i].name] = variable;
    });

    //determine the file to import
    match.file = this.routes[match.route];
    if (match.file.indexOf('/') === 0) {
      match.file = match.file.substr(1);
    }

    //return the match object
    return match;
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
    //try to get a route match
    const route = this.match(path);

    //if no route
    if(!route) {
      //callback with false
      callback(route);
      return this;
    }

    //import the view
    import(`reactus/views/${route.file}.jsx`).then(view => {
      //call the callback with the view
      callback(route, view.default);
    });

    return this;
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
    super(props);

    //props has a wealth of information given
    // - history - the npm package history object
    // - routes - the predefined routes
    // - component - the initial component from the server (for hydrate)
    // - props - the initial props from the server (see script#react-data in your HTML)
    // - route - the route meta data that the server processed (in case you need it)

    //in this case we just need history and routes
    const { history, routes } = this.props;

    //make a new router
    this.router = new Router(routes);

    //we are going to listen to history changes
    //and call handleRoute() if there are.
    history.listen(this.handleRoute.bind(this));

    //initial state
    this.state = {};
  }

  /**
   * Tries to call on getInitialProps() which is optionally defined
   * in a component, then will set the state based on those props,
   *
   * @param {Object} route
   * @param {(Component|Null)} component
   */
  handleComponent(route, component) {
    //if no component
    if (!component) {
      //nothing we can do.
      return;
    }

    //guarantee we have props
    let props = {};

    //if no getInitialProps
    if (typeof component.getInitialProps !== 'function') {
      //just change the state
      this.setState({ component, route, props });
      return;
    }

    //there is an initial props
    props = component.getInitialProps(route);

    //if it is not an async function
    if (typeof props.then !== 'function') {
      //now change the state
      this.setState({ component, route, props });
      return;
    }

    //call then
    props.then(props => {
      //finally change the state
      this.setState({ component, route, props });
    });
  }

  /**
   * Maps the history path with what the router is expecting then
   * redirects routing to handleComponent()
   *
   * @param {Object} location
   */
  handleRoute(location) {
    //if no pathname
    if (!location.pathname) {
      //nothing we can do...
      return;
    }

    this.router.route(location.pathname, this.handleComponent.bind(this));
  }

  /**
   * React's expected render method
   *
   * @return {(Component|Null)}
   */
  render() {
    //try to get the component
    const component = this.state.component || this.props.component;

    //if no component
    if (!component) {
      //nothing we can do...
      return null;
    }

    //try to get the props and route
    const props = this.state.props || this.props.props || {};
    const route = this.state.route || this.props.route || {};

    //from here, we will try to make it into an element

    props.route = route;
    props.history = this.props.history;

    return React.createElement(component, props);
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
  //make a new router temporarily to load the initial component
  const router = new Router(routes);

  //this is a react composite that we will pass on later on
  const composite = (props) => {
    return React.createElement(ReactRouter, props)
  };

  //now, try to route
  router.route(history.location.pathname, (route, component) => {
    //if no component found, throw an error
    if (!component) {
      throw new Error(history.location.pathname + ' has no component');
    }

    //get initial props
    let props = {};
    //see: script#react-data in your HTML
    const data = document.getElementById('react-data');
    if (data) {
      props = JSON.parse(data.innerHTML) || {};
    }

    //now call the entry callback so it can handle it
    callback(composite, { history, routes, component, props, route });
  });
}
```

You can change this with the following snippet of code.

```js
//#FILE: [ROOT]/engine.js
...
engine.set('router', '/absolute/path/to/your/router/file.jsx')
...
```

#### 2.3.3. White Labeling

If you are creating your own framework using `reactus`, you may want to
change the brand name. You can do this with the following snippet of code.

```js
//#FILE: [ROOT]/engine.js
...
engine.set('brand', 'your_framework')
...
```

This way, virtual files can be accessed like `your_framework/views/product/detail.jsx`
for example.

#### 2.3.4. Adding Custom Virtual Files

If you want to declare custom virtual files, you can do so like the following
snippet.

```js
//#FILE: [ROOT]/engine.js
import fs from 'fs'
...

const engine = Reactus()
const target = 'node_modules/reactus/custom.js';
engine.customFiles[target] = fs.readFileSync('/absolute/path/to/your/code');
...
```

This way, virtual files can be accessed like `reactus/custom` for example. If
you noticed, you can actually pass any code as a string or buffer to
`engine.customFiles`.

#### 2.3.5. Not Using Express or Custom Router

If you are not using `express` or using a custom router, you will just need to
change the middleware to map these changes.

```js
//#FILE: [ROOT]/engine.js
...

const engine = Reactus()

engine.middleware = function() { /* YOUR CODE */ }
engine.Middleware.prototype.initializeDev = function() { /* YOUR CODE */ }
engine.Middleware.prototype.initializeHot = function() { /* YOUR CODE */ }
engine.Middleware.prototype.initializeBundler = function() { /* YOUR CODE */ }
...
```
