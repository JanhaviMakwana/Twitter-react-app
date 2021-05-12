import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { withAuth } from './twitter-context';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import './App.css';

function PrivateRoutes({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
};

function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to="/home" />}
    />
  );
};

class App extends React.Component {
  render() {
    console.log(this.props.isAuthenticated);
    return (
      <div className="App">
        <Switch>
          <PrivateRoutes path="/home" isAuthenticated={this.props.isAuthenticated} component={Home} />
          <PublicRoute path="/login" isAuthenticated={this.props.isAuthenticated} component={Auth} />
          <PublicRoute path="/" isAuthenticated={this.props.isAuthenticated} component={Auth} />
        </Switch>
      </div>
    );
  }

}

export default withAuth(App);
