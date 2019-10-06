import path from 'path'
import reactus from 'reactus'

const engine = reactus({ name: 'web' })

//add modules/middleware
require('./module/home/engine')
require('./module/product/engine')

export default engine
