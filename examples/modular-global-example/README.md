# Reactus Modular Global Example

Based on the [Quick Start Example](https://github.com/Openovate/reactus/tree/master/examples/quick-start-example),
this example shows how `reactus` would look like in a modular architecture
importing a global named engine to each file that needs it. The example is
structured like the following where `[ROOT]` is denoted as your project root.

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
[here](https://github.com/Openovate/reactus/tree/master/examples/modular-global-example).
If you copy the full example on your local computer you just need to run the
following command in terminal `$ cd [ROOT] && npm i && npm start`.

## 1. Named Engine

A named engine can be declared like `reactus({ name: 'global' })` and accessed
like `import engine from 'reactus/engine/global'`. This is useful if you want to
allow modules to access the main engine directly without passing via callback or
dealing with multiple engines easily.

## 2. Main Engine File

The main file declares a named engine like `reactus({ name: 'web' })`, then
activates each module's engine to the main process by simply requiring it.

```js
//#FILE: [ROOT]/engine.js
import path from 'path'
import reactus from 'reactus'

const engine = reactus({ name: 'web' })

//add modules/middleware
require('./module/home/engine')
require('./module/product/engine')

export default engine
```

## 3. Module Engine File

Each module can access the named engine declared in `[ROOT]/engine.js` by
simply importing it like `import engine from 'reactus/engine/web'`

```js
//#FILE: [ROOT]/module/home/engine.js
import path from 'path'
import engine from 'reactus/engine/web'

//add commponents
engine.component('Link', path.join(__dirname, 'components/Link.jsx'))

//add views
engine.view('/', '/home', path.join(__dirname, 'views/Home.jsx'))
```

## 4. Module Router File

Similarily the router can access the named engine's `render()` function by
simply importing the named engine as well.

```js
//#FILE: [ROOT]/module/home/router.js
import express from 'express'
import engine from 'reactus/engine/web'

const router = express.Router();

//add API functions
function getHome() {
  return { title: 'Home Page' }
}

//add routes
router.get('/', async(req, res) => {
  const props = getHome()
  const pageProps = { title: 'Welcome!' }

  res.setHeader('Content-Type', 'text/html')
  engine.render(res, '/home', props, pageProps)
})

router.get('/api/home', (req, res) => {
  res.setHeader('Content-Type', 'text/json')
  res.send(getHome())
})

export default router
```
