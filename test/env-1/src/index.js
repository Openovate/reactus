import http from 'http'
import express from 'express'
import engine from './engine'

const app = express()

//use engine
app.use(engine.middleware())

//add API functions
function getHome() {
  return { title: 'Home Page' }
}

function getProduct(id) {
  return { title: `Product ${id}` }
}

//add routes
app.get('/', async(req, res) => {
  res.setHeader('Content-Type', 'text/html')
  engine.render('/home', res, getHome())
})

app.get('/product/:id', async(req, res) => {
  res.setHeader('Content-Type', 'text/html')
  engine.render('/product/detail', res, getProduct(req.params.id))
})

app.get('/api/home', (req, res) => {
  res.setHeader('Content-Type', 'text/json')
  res.send(getHome())
})

app.get('/api/product/:id', async(req, res) => {
  res.setHeader('Content-Type', 'text/json')
  res.send(getProduct(req.params.id))
})

//start http server
const server = http.createServer(app).listen(3000)
