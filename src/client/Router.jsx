import path from 'path';
import React from 'react';
import pathToRegexp from 'path-to-regexp';

/**
 * Let's base the React router from an actual router class
 */
class Router {
  /**
   * Adds the pre defined routes
   *
   * @param {Object} routes
   */
  constructor(routes) {
    this.history = history;
    this.routes = routes;
  }

  /**
   * Tries to match a route with the given path
   *
   * @param {String} path
   *
   * @return {(Object|false)}
   */
  match(path) {
    const match = { args: [], keys: [], params: {} };

    for(const route in this.routes) {
      match.route = route;
      match.pattern = pathToRegexp(match.route, match.keys);
      match.results = match.pattern.exec(path);

      //if we found a match
      if (match.results && match.results.length) {
        break;
      }
    }

    //if no match was found
    if (!match.results || !match.results.length) {
      return false;
    }

    //match was found, let's add what we can find to match

    //full path
    match.path = match.results.shift();
    //this is to populate matched arguments and parameters
    match.results.forEach((variable, i) => {
      //if there is no key for this...
      if (!match.keys[i] || !match.keys[i].name) {
        return;
      }

      // if name a number
      if (typeof match.keys[i].name === 'number') {
        //it should be set as an argument
        match.args.push(variable);
        return;
      }

      //name is a string, set it as a parameter
      match.params[match.keys[i].name] = variable;
    });

    //determine the file to import
    match.file = this.routes[match.route];
    if (match.file.indexOf('/') === 0) {
      match.file = match.file.substr(1);
    }

    //return the match object
    return match;
  }

  /**
   * Matches the path and imports the view
   *
   * @param {String} path
   * @param {Function} callback
   *
   * @return {(Object|false)}
   */
  route(path, callback) {
    //try to get a route match
    const route = this.match(path);

    //if no route
    if(!route) {
      //callback with false
      callback(route);
      return this;
    }

    //import the view
    import(`reactus/views/${route.file}.jsx`).then(view => {
      //call the callback with the view
      callback(route, view.default);
    });

    return this;
  }
}

/**
 * Now let's create a react version of the router
 */
class ReactRouter extends React.Component {
  /**
   * Set the router from above
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    //props has a wealth of information given
    // - history - the npm package history object
    // - routes - the predefined routes
    // - component - the initial component from the server (for hydrate)
    // - props - the initial props from the server (see script#react-data in your HTML)
    // - route - the route meta data that the server processed (in case you need it)

    //in this case we just need history and routes
    const { history, routes } = this.props;

    //make a new router
    this.router = new Router(routes);

    //we are going to listen to history changes
    //and call handleRoute() if there are.
    history.listen(this.handleRoute.bind(this));

    //initial state
    this.state = {};
  }

  /**
   * Tries to call on getInitialProps() which is optionally defined
   * in a component, then will set the state based on those props,
   *
   * @param {Object} route
   * @param {(Component|Null)} component
   */
  handleComponent(route, component) {
    //if no component
    if (!component) {
      //nothing we can do.
      return;
    }

    //guarantee we have props
    let props = {};

    //if no getInitialProps
    if (typeof component.getInitialProps !== 'function') {
      //just change the state
      this.setState({ component, route, props });
      return;
    }

    //there is an initial props
    props = component.getInitialProps(route);

    //if it is not an async function
    if (typeof props.then !== 'function') {
      //now change the state
      this.setState({ component, route, props });
      return;
    }

    //call then
    props.then(props => {
      //finally change the state
      this.setState({ component, route, props });
    });
  }

  /**
   * Maps the history path with what the router is expecting then
   * redirects routing to handleComponent()
   *
   * @param {Object} location
   */
  handleRoute(location) {
    //if no pathname
    if (!location.pathname) {
      //nothing we can do...
      return;
    }

    this.router.route(location.pathname, this.handleComponent.bind(this));
  }

  /**
   * React's expected render method
   *
   * @return {(Component|Null)}
   */
  render() {
    //try to get the component
    const component = this.state.component || this.props.component;

    //if no component
    if (!component) {
      //nothing we can do...
      return null;
    }

    //try to get the props and route
    const props = this.state.props || this.props.props || {};
    const route = this.state.route || this.props.route || {};

    //from here, we will try to make it into an element

    props.route = route;
    props.history = this.props.history;

    return React.createElement(component, props);
  }
}

/**
 * The reason why this is patterned like this is because of the
 * asyncronous nature of import(). We can't just call hydrate without
 * the component file being loaded. We created a wrapper to wait for
 * the initial component view to be loaded before we call hydrate
 *
 * @param {History} history
 * @param {Object} routes
 * @param {Function} callback
 */
export default function createRouter(history, routes, callback) {
  //make a new router temporarily to load the initial component
  const router = new Router(routes);

  //this is a react composite that we will pass on later on
  const composite = (props) => {
    return React.createElement(ReactRouter, props)
  };

  //now, try to route
  router.route(history.location.pathname, (route, component) => {
    //if no component found, throw an error
    if (!component) {
      throw new Error(history.location.pathname + ' has no component');
    }

    //get initial props
    let props = {};
    //see: script#react-data in your HTML
    const data = document.getElementById('react-data');
    if (data) {
      props = JSON.parse(data.innerHTML) || {};
    }

    //now call the entry callback so it can handle it
    callback(composite, { history, routes, component, props, route });
  });
}
