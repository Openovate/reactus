import path from 'path'
import engine from 'reactus/engine/web'

//add views
engine.view('/product/:id', '/product/detail', path.join(__dirname, 'views/Product.jsx'))
