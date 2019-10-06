import '@babel/polyfill';
import ReactDOM from 'react-dom';
import routes from 'bare_metal/bare_routes';
import createRouter from './Router.jsx';

const { createBrowserHistory } = require('history');
const history = createBrowserHistory();

createRouter(history, routes, (Router, props) => {
  ReactDOM.hydrate(Router(props), document.getElementById('root'));
})
