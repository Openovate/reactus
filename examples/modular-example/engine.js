import path from 'path'
import reactus from 'reactus'

const engine = reactus()

//add modules/middleware
engine.use(require('./module/home/engine').default)
engine.use(require('./module/product/engine').default)

export default engine
