import path from 'path'
import reactus from 'reactus'
import sample from './module/sample/engine'

const engine = reactus()

//add modules/middleware
engine.use(sample)

export default engine
