import React, { useEffect } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import pageStyles from './login.module.scss';
import { toCamelCaseObject, noop, hasPresentValues, getHash } from 'helpers';

import { getAccent } from 'redux/modules/settings/selectors';
import ReduxTypes from 'redux/modules/moduleTypes';
import { actions } from 'redux/modules/auth';
import { BrowserRouter, Route, Redirect, RouteProps } from 'react-router-dom';

import { getIsAuthenticated } from 'redux/modules/auth/selectors';

import { AccentType } from 'utils/constants';

import LoginPanel from 'components/LoginPanel/LoginPanel';
import LogoHeader from 'components/LogoHeader';
import Button from 'components/Button';

import SpotifyService from 'services/SpotifyService/SpotifyService';

interface Props {
  accent: AccentType;
  isAuthenticated: boolean;
  setTokenInfo: Function;
}

const styles = toCamelCaseObject(pageStyles);

const { pageContainer, loginBackground } = styles;

const renderLoginButtons = (accent = 'teal') => (props = {}) => (
  <Button
    {...props}
    ghost
    accent={accent}
    className={styles.loginButton}
    isRounded
  />
);

const Redirection = ({ path = '' }) => (
  <Redirect
    to={{
      pathname: path
    }}
  />
);

const Login: React.FC<Props> = ({
  accent = 'teal',
  setTokenInfo = noop,
  isAuthenticated
}) => {
  const tokenInfo = getHash();
  const tokenInfoFromLocalStorage = SpotifyService.getTokenFromStorage();

  const combinedTokenInfo = {
    ...tokenInfo,
    ...tokenInfoFromLocalStorage
  };

  const buttons = [
    {
      key: 'LOGIN_BUTTON_1',
      text: 'Login with Spotify',
      onClick: () => SpotifyService.authenticate(),
      icon: 'ios-person'
    },
    {
      key: 'LOGIN_BUTTON_2',
      text: 'Register for Spotify',
      onClick: noop,
      icon: 'ios-person-add'
    }
  ];

  useEffect(() => {
    if (hasPresentValues(combinedTokenInfo)) {
      setTokenInfo(combinedTokenInfo);
    }
  });

  return isAuthenticated ? (
    <Redirect
      to={{
        pathname: '/home'
      }}
    />
  ) : (
    <div className={classnames(pageContainer, loginBackground)}>
      <LoginPanel>
        <LogoHeader accent={accent} className={styles.header} />
        {buttons.map(renderLoginButtons(accent))}
      </LoginPanel>
    </div>
  );
};

const mapStateToProps = (state: ReduxTypes['state']) => ({
  accent: getAccent(state),
  isAuthenticated: getIsAuthenticated(state)
});

const mapActionsToProps = {
  setTokenInfo: actions.setTokenInfo
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
