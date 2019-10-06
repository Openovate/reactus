import http from 'http'
import express from 'express'
import reactus from 'reactus'
import config from './webpack.config'

const app = express()

app.use(reactus.devpack(config))
app.use(require('./module/home/router').default)
app.use(require('./module/product/router').default)

//start http server
const server = http.createServer(app).listen(3000)
