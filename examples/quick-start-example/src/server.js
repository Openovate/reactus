import http from 'http'
import express from 'express'
import reactus from 'reactus'
import engine from './engine'
import config from '../webpack.config';

const app = express()

app.use(reactus.devpack(config));

//add API functions
function getHome() {
  return { title: 'Home Page' }
}

function getProduct(id) {
  return { title: `Product ${id}` }
}

//add routes
app.get('/', async(req, res) => {
  const props = getHome()
  const pageProps = { title: 'Welcome!' }

  res.setHeader('Content-Type', 'text/html')
  engine.render(res, '/home', props, pageProps)
})

app.get('/product/:id', async(req, res) => {
  const props = getProduct(req.params.id)
  const pageProps = { title: 'Product Detail' }

  res.setHeader('Content-Type', 'text/html')
  engine.render(res, '/product/detail', props, pageProps);
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
