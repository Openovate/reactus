import http from 'http'
import express from 'express'
import reactus from 'reactus'
import config from './webpack.config'
import sample from './module/sample/router'

const app = express()

app.use(reactus.devpack(config))
app.use(sample)

//start http server
const server = http.createServer(app).listen(3000)
