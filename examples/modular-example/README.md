# Reactus Modular Example

Based on the [Quick Start Example](https://github.com/Openovate/reactus/tree/master/examples/quick-start-example),
this example shows how `reactus` would look like in a modular architecture. The
example is structured like the following where `[ROOT]` is denoted as your
project root.

```
[ROOT]
|- module/
   |- sample/
      |- components/
         |- Link.jsx
      |- views/
         |- Home.jsx
         |- Product.jsx
       |- engine.js
       |- server.js
|- engine.js
|- server.js
|- .babelrc
|- package.json
|- webpack.config.js
```

You can view the files of this example
[here](https://github.com/Openovate/reactus/tree/master/examples/modular-example).
If you copy the full example on your local computer you just need to run the
following command in terminal `$ cd [ROOT] && npm i && npm start`.

# 1. Module Engine File

Each module can have it's own separate engine file that can specify
configuration specific to that module to achieve separation of responsibility.
The following example shows how this can be done.

```js
//#FILE: [ROOT]/module/home/engine.js
import path from 'path'
import reactus from 'reactus'

const engine = reactus.VirtualRegistry();

//add commponents
engine.component('Link', path.join(__dirname, 'components/Link.jsx'))

//add views
engine.view('/', '/home', path.join(__dirname, 'views/Home.jsx'))

export default engine
```

# 2. Main Engine File

The main engine file activates each module's engine to the main process using
`engine.use(middleware)` similar to how `express` works.

```js
//#FILE: [ROOT]/engine.js
import path from 'path'
import reactus from 'reactus'

const engine = reactus()

//add modules/middleware
engine.use(require('./module/home/engine').default)
engine.use(require('./module/product/engine').default)

export default engine
```

The main point to focus on is `engine.use(middleware)` that accepts any of the
following types.

 - `middleware` - plain object of keys and values; for example
 `{ component: { Link: 'path/to/Link.jsx' } }`
 - `middleware` - VirtualRegistry; for example `reactus.VirtualRegistry()`
 - `middleware` - function; for example `(engine) => {}`
