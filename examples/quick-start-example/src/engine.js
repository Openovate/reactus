import path from 'path'
import reactus from 'reactus'

const engine = reactus()

//add params
engine.set('source', 'babel', path.join(__dirname, '../.babelrc'))

//add commponents
engine.component('Link', path.join(__dirname, 'components/Link.jsx'))

//add views
engine.view('/', '/home', path.join(__dirname, 'views/Home.jsx'))
engine.view('/product/:id', '/product/detail', path.join(__dirname, 'views/Product.jsx'))

export default engine
