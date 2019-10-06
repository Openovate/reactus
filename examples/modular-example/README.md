# Reactus Modular Example

Based on the [Quick Start Example](https://github.com/Openovate/reactus/tree/master/examples/quick-start-example),
this example shows how to use `reactus` using a modular system. This example uses
the following external libraries.

 - `babel` - Used to transform ESM and JSX to common JS on the server side
 - `react` - Used to process components and views
 - `webpack` - Used to transform ESM and JSX to common JS on the client side

The example is structured like the following where `[ROOT]` is denoted as your
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
