import '@babel/polyfill';
import ReactDOM from 'react-dom';
import routes from 'reactus/routes';
import Router from 'reactus/Router.jsx';

const { createBrowserHistory } = require('history');
const history = createBrowserHistory();

ReactDOM.render(
  Router(history, routes),
  document.getElementById('root')
)
