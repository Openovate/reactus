# Reactus Quick Start Example

This example project demonstrates how to quickly setup a `reactus` project. This
example uses the following external libraries.

 - `babel` - Used to transform ESM and JSX to common JS on the server side
 - `webpack` - Used to transform ESM and JSX to common JS on the client side

React comes with optional quick start methods but are not actually required to
use. The following quick start methods being used are the following.

 - `reactus.devpack` - returns the `webpack-dev-middleware` and
 `webpack-hot-middleware` as one middleware to be used with `express`
 - `reactus/entry.js` - used in `webpack.config.js` as the entry file
 - `reactus/Router.jsx` - used in the `reactus/entry.js` file for
 client side react routing with code splitting in mind.

The example is structured like the following where `[ROOT]` is denoted as your
project root.

```
[ROOT]
|- src/
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

#### Navigation

 - [1. Install](#1-setup-package-json)
 - [2. Setup Development Environment](#2-setup-development-environment)
 - [3. Create an Engine File](#3-create-an-engine-file)
 - [4. Create Components and Views](#4-create-components-and-views)
 - [5. Create a Server File](#5-create-a-server-file)
 - [6. Add Scripts to Package Configuration](#6-add-scripts-to-package-configuration)
 - [7. Done](#7-done)

## 1. Setup package.json

Run the following commands in terminal.

```bash
$ cd [ROOT]

$ npm init -y

...

$ npm i --save reactus express react react-dom history

...

$ npm i --save-dev @babel/cli @babel/node @babel/core @babel/preset-env @babel/preset-react @babel/polyfill babel-loader webpack webpack-cli
```

The following describes each package installed and what it is used for.

### 1.1. Dependencies

 - `reactus` - used to generate a virtual file structure for modular purposes
 - `express` - used to declare and process server URL routing
 - `react` - used process all the components and views
 - `react-dom` - used in `reactus/entry.js` to transform JSX to string
 - `history` - used in `reactus/entry.js` to listen for client side URL changes
 **(NOTE: Virtual files like `reactus/entry.js` are still treated like project
 files. That's why you should include this package)**
 and client side routing **(NOTE: Virtual files like `reactus/entry.js` are
 still treated like project files. That's why you should include this package)**

### 1.2. Development Dependencies

 - `@babel/cli` - used to run the `babel` terminal command which is used to
 transform ESM and JSX files to common JS
 - `@babel/node` - used to run `babel-node` terminal command which is used to
 transform ESM and JSX files to common JS in memory for development mode
 - `@babel/core` - used to programmatically transform ESM and JSX files to
 common JS. **(NOTE: `@babel/polyfill` will throw an error if this is not included)**
 - `@babel/preset-env` - used in `.babelrc` and is the main transformation
 preset
 - `@babel/preset-react` - used in `.babelrc` and is the JSX transformation
 preset
 - `@babel/polyfill` - used in `reactus/entry.js` to transform JSX files to
 common JS on the client side as it is required *(`require()`)*
 - `babel-loader` used in `webpack.config.js` to transform JSX files to
 common JS on the client side as the bundle is being built
 - `webpack` - used in `webpack.config.js` to enable `HotModuleReplacementPlugin()`
 which is used for development
 - `webpack-cli` - used to run the `webpack` terminal command which is used to
 transform ESM and JSX files to common JS and bundle it into one file

## 2. Setup Development Environment

Create a file called `[ROOT]/.babelrc` with the following content.

```json
{
  "presets": ["@babel/env", "@babel/preset-react"]
}
```

This is needed to tell `babel` how to transform the given source code when we
run `$ babel` or `$ babel-node`. Next, create a file called
`[ROOT]/webpack.config.js` with the following content.

```js
const { join } = require('path');
const webpack = require('webpack');
const engine = require('./src/engine').default;

module.exports = {
  mode: 'development',
  entry: {
    index: [
      'webpack-hot-middleware/client?reload=true',
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
    new webpack.HotModuleReplacementPlugin(),
    new engine.WebpackPlugin()
  ]
};
```

We need to make sure in our config that there is a rule to transform the
`reactus` package by setting `include: /node_modules\/reactus/` as a module
rule. The next important thing to have is the `HotModuleReplacementPlugin()`.
This will allow re-bundling and reloads when you develop your project. Lastly
the way `reactus` is connected to your overall project is by adding
`new engine.WebpackPlugin()` in your plugins list. We will discuss how to build
the `engine` in the next section.

## 3. Create an Engine File

Create a file called `[ROOT]/src/engine.js` with the following contents.

```js
//#FILE: [ROOT]/src/engine.js
import path from 'path'
import reactus from 'reactus'

const engine = reactus()

//add params
engine.set('babel', path.join(__dirname, '../.babelrc'))

//add commponents
engine.component('Link', path.join(__dirname, 'components/Link.jsx'))

//add views
engine.view('/', '/home', path.join(__dirname, 'views/Home.jsx'))
engine.view('/product/:id', '/product/detail', path.join(__dirname, 'views/Product.jsx'))

export default engine
```

### 3.1. Parameters

We instantiate the `engine` using `Reactus()`. Next, we need to tell the
engine where to get the babel config using `engine.set('babel', ...)`.

### 3.2. Components

Next, we need to declare all the components that will be used in the project.
`reactus` virtually builds a global component registry accessible only by views
using `import Link from 'reactus/components/Link.jsx'` for example.

> NOTE: `reactus/components/Link.jsx` is a virtual file that does not really exist.

The method `engine.component(name, path to source file)` is a function used to
register components where the following parameters are accepted.

 - **name** - the name of the component; use a standard file name format
 *(ie. no special character, spaces, etc.)*
 - **path to source file** - the actual place where the source code is located

### 3.3. Views

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

## 4. Create Components and Views

Create a file called `[ROOT]/src/components/Link.jsx` with the following contents.

```js
//#FILE: [ROOT]/src/components/Link.jsx
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

Create a file called `[ROOT]/src/views/Home.jsx` with the following contents.

```js
//#FILE: [ROOT]/src/views/Home.jsx
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

> NOTE: Remember that in `[ROOT]/src/engine.js`, this component was registered as a virtual component. That is how it can be accessed like `import Link from  'reactus/components/Link.jsx'`.

The client side routing of `reactus` automatically calls on `Home.getInitialProps()`.
Here is where you should `fetch` data from the server assuming that it was not
already loaded.

Create another file called `[ROOT]/src/views/Product.jsx` with the following
contents.

```js
//#FILE: [ROOT]/src/views/Product.jsx
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

## 5. Create a Server File

Create a file called `[ROOT]/src/server.js` with the following contents.

```js
//#FILE: [ROOT]/src/server.js
import http from 'http'
import express from 'express'
import reactus from 'reactus'
import engine from './engine'
import config from '../webpack.config';

const app = express()

// use devpack
app.use(reactus.devpack(config));

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

A shortcut to using `webpack-dev-middleware` and `webpack-hot-middleware` is by
using `reactus.devpack` like this: `app.use(reactus.devpack(config))`.

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

## 6. Add Scripts to Package Configuration

In your `[ROOT]/package.json`, add the following scripts.

```js
{
  ...
  "scripts": {
    "start": "babel-node src/server.js"
  }
  ...
}
```

We use `babel-node` in this case to read from the `.babelrc` file to transform
both ES modules and react files to Common JS.

## 7. Done

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
