import path from 'path'
import reactus from 'reactus'

const engine = reactus.VirtualRegistry();

//add views
engine.view('/product/:id', '/product/detail', path.join(__dirname, 'views/Product.jsx'))

export default engine
