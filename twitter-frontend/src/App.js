import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { withAuth } from './twitter-context';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import {SET_AUTH_DATA} from './store/actionTypes';
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

  componentDidMount() {
    const user = localStorage.getItem('user');
    user && this.props.dispatch({type: SET_AUTH_DATA, user: user});
    window.onunload = () => {
      localStorage.clear();
    };
  }

  render() {
   
    return (
      <div className="App">
        <Switch>
          <PrivateRoutes path="/home" isAuthenticated={this.props.state.user ? true : false} component={Home} />
          <PublicRoute path="/login" isAuthenticated={this.props.state.user ? true : false} component={Auth} />
          <PublicRoute path="/" isAuthenticated={this.props.state.user ? true : false} component={Auth} />
        </Switch>
      </div>
    );
  }

}

export default withAuth(App);
