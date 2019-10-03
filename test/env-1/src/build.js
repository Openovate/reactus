import engine from './engine'

engine.compile((err, stats) => {
  console.log('Done!', err)
})
