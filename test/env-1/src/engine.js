import path from 'path'
import Reactus from '../../../src'
import config from '../webpack.config'
import Page from './components/Page.jsx'

//shim the reactus package. only needed for testing
Reactus.Engine.Helpers.shim();

const engine = Reactus()

//add params
engine.set('webpack', config)
engine.set('page', Page)

//add commponents
engine.component('Link', path.join(__dirname, 'components/Link.jsx'))

//add views
engine.view('/', '/home', path.join(__dirname, 'views/Home.jsx'))
engine.view('/product/:id', '/product/detail', path.join(__dirname, 'views/Product.jsx'))

export default engine
