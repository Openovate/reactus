import '@babel/polyfill';
import ReactDOM from 'react-dom';
import routes from 'reactve/routes';
import Router from 'reactve/Router.jsx';

const { createBrowserHistory } = require('history');
const history = createBrowserHistory();

ReactDOM.render(
  Router(history, routes),
  document.getElementById('root')
)
