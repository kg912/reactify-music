import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, RouteProps } from 'react-router-dom';

import ReduxTypes from 'redux/modules/moduleTypes';

import { getIsAuthenticated } from 'redux/modules/auth/selectors';
import Login from 'views/LoginPage/LoginPage';
import Home from 'views/Home/Home';

interface ProtectedRoute {
  isAuthenticated: boolean;
  routeProps: RouteProps;
}

const ProtectedRoute = ({ isAuthenticated, routeProps }: ProtectedRoute) =>
  isAuthenticated ? <Route {...routeProps} /> : <Redirect to="/login" />;

const AppContainer = ({ isAuthenticated }: { isAuthenticated?: boolean }) => {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute
        isAuthenticated={isAuthenticated ?? false}
        routeProps={{ path: '/home', component: Home }}
      />
    </BrowserRouter>
  );
};

const mapStateToProps = (state: ReduxTypes['state']) => ({
  isAuthenticated: getIsAuthenticated(state)
});

export default connect(mapStateToProps, null)(AppContainer);
