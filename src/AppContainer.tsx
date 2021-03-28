import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, RouteProps } from 'react-router-dom';

import { noop } from 'helpers';

import ReduxTypes from 'redux/modules/moduleTypes';

import { getIsAuthenticated } from 'redux/modules/auth/selectors';

import SpotifyService from 'services/SpotifyService/SpotifyService';

import { actions } from 'redux/modules/auth';
import Login from 'views/LoginPage/LoginPage';
import Home from 'views/Home/Home';

interface ProtectedRoute {
  isAuthenticated: boolean;
  routeProps: RouteProps;
}

interface AppContainerProps {
  isAuthenticated?: boolean;
  logout: () => void;
}

const ProtectedRoute = ({ isAuthenticated, routeProps }: ProtectedRoute) =>
  isAuthenticated ? <Route {...routeProps} /> : <Redirect to="/login" />;

const AppContainer = ({
  isAuthenticated,
  logout = noop,
}: AppContainerProps) => {
  useEffect(() => {
    SpotifyService.setLogoutSwitch(logout);
  }, [isAuthenticated, logout]);

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
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps, { logout: actions.logout })(
  AppContainer
);
