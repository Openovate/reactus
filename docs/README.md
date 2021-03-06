[reactus](README.md) › [Globals](globals.md)

# reactus

# Reactus

An un-opinionated, un-routed version of a **React** app build engine. There are
many great React frameworks, most notably [Next.js](https://nextjs.org/) and
[Razzle](https://github.com/jaredpalmer/razzle) each helping developers setup
their React app faster than traditional tooling. Reactus is a
**lite** version of a React framework, focused on generating bundles via
**Webpack**.

Use **Reactus** if:

 - You want to define your own custom file structure
 - You want to create your own React framework
 - You have spent an exhaustive amount of time looking at Webpack's code.
 - You like to work with bare metal libraries

Do not use **Reactus** if:

 - You want an out of box full stack solution
 - You want a Zero config framework

## Navigation

 - [1. Install](#1-install)
 - [2. Usage](#2-usage)
   - [Quick Start Example](https://github.com/Openovate/reactus/tree/master/examples/quick-start-example)
   - [Modular Example](https://github.com/Openovate/reactus/tree/master/examples/modular-example)
   - [Modular Global Example](https://github.com/Openovate/reactus/tree/master/examples/modular-global-example)
   - [Bare Metal Example](https://github.com/Openovate/reactus/tree/master/examples/bare-metal-example)
 - [3. Customizing](#23-customizing)
   - 3.1. [Use a Custom Entry File](#31-use-a-custom-entry-file)
   - 3.2. [Use a Custom Router File](#32-use-a-custom-router-file)
   - 3.3. [White Labeling](#33-white-labeling)
   - 3.4. [Adding Custom Virtual Files](#34-adding-custom-virtual-files)
   - 3.5. [Use a Custom Page](#35-use-a-custom-page)
 - [4. API](https://github.com/Openovate/reactus/tree/master/docs/globals.md)

### 1. Install

```bash
$ npm i --save reactus
```

### 2. Usage

The following examples show how to use `reactus` in detail.

 - [Quick Start Example](https://github.com/Openovate/reactus/tree/master/examples/quick-start-example)
 - [Modular Example](https://github.com/Openovate/reactus/tree/master/examples/modular-example)
 - [Modular Global Example](https://github.com/Openovate/reactus/tree/master/examples/modular-global-example)
 - [Bare Metal Example](https://github.com/Openovate/reactus/tree/master/examples/bare-metal-example)

### 3. Customizing

This section will show how `reactus` can be changed to fit your project needs.

#### 3.1. Use a Custom Entry File

Used to be a quick start point, `reactus` uses a
[pre-defined entry file](https://github.com/Openovate/reactus/tree/master/src/client/entry.js).
You can change this with the following snippet of code.

```js
//#FILE: [ROOT]/src/engine.js
...
engine.set('source', 'entry', '/absolute/path/to/your/entry/file.js')
...
```

Additionally in your own `[ROOT]/webpack.config.js`, you can simply point the
entry directly to your file.

#### 3.2. Use a Custom Router File

Used to be a quick start point, `reactus` uses a
[pre-defined router file](https://github.com/Openovate/reactus/tree/master/src/client/Router.jsx).
You can change this with the following snippet of code.

```js
//#FILE: [ROOT]/src/engine.js
...
engine.set('source', 'router', '/absolute/path/to/your/router/file.jsx')
...
```

If you are using your own custom entry file like in `3.1. Use a Custom Entry File`,
you can directly import your custom router from there.

#### 3.3. White Labeling

If you are creating your own framework using `reactus`, you may want to
change the brand name. You can do this with the following snippet of code.

```js
//#FILE: [ROOT]/src/engine.js
...
engine.set('label', 'your_framework')
...
```

This way, virtual files can be accessed like `your_framework/views/product/detail.jsx`
for example.

#### 3.4. Adding Custom Virtual Files

If you want to declare custom virtual files, you can do so like the following
snippet.

```js
//#FILE: [ROOT]/src/engine.js
...
engine.set('map', 'node_modules/reactus/custom.js', '/absolute/path/to/your/code');
...
```

This way, virtual files can be accessed like `reactus/custom` for example. `map`
is formed as `engine.set('map', target, source)` where the following parameters
are accepted.

 - `target` - the virtual file path *(can be a file or folder)*
 - `source` - the actual path where the file is located, or;
 - `source` - the actual path where the folder is located, or;
 - `source` - the string code to place in the virtual file.

#### 3.5. Use a Custom Page

Used to be a quick start point, `reactus` uses a
[pre-defined entry file](https://github.com/Openovate/reactus/tree/master/src/client/Page.jsx).
You can change this with the following snippet of code.

```js
//#FILE: [ROOT]/src/engine.js
...
engine.set('page', '/absolute/path/to/your/Page.jsx')
...
```

> NOTE: If you are using the default `Router.jsx`, we pass hydrated data using script#react-data in the Page component
