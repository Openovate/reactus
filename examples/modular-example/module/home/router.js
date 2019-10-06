import express from 'express'
import engine from './engine'

const router = express.Router();

//add API functions
function getHome() {
  return { title: 'Home Page' }
}

//add routes
router.get('/', async(req, res) => {
  const props = getHome()
  const pageProps = { title: 'Welcome!' }

  res.setHeader('Content-Type', 'text/html')
  engine.render(res, '/home', props, pageProps)
})

router.get('/api/home', (req, res) => {
  res.setHeader('Content-Type', 'text/json')
  res.send(getHome())
})

export default router
