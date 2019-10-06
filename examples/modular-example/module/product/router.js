import express from 'express'
import engine from './engine'

const router = express.Router();

function getProduct(id) {
  return { title: `Product ${id}` }
}

router.get('/product/:id', async(req, res) => {
  const props = getProduct(req.params.id)
  const pageProps = { title: 'Product Detail' }

  res.setHeader('Content-Type', 'text/html')
  engine.render(res, '/product/detail', props, pageProps);
})

router.get('/api/product/:id', async(req, res) => {
  res.setHeader('Content-Type', 'text/json')
  res.send(getProduct(req.params.id))
})

export default router
