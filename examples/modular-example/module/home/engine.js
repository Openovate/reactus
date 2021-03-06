import path from 'path'
import reactus from 'reactus'

const engine = reactus.VirtualRegistry();

//add commponents
engine.component('Link', path.join(__dirname, 'components/Link.jsx'))

//add views
engine.view('/', '/home', path.join(__dirname, 'views/Home.jsx'))

export default engine
