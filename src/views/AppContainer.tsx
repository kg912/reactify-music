import React from 'react';
import { connect } from 'react-redux';
import ReduxTypes from 'redux/modules/moduleTypes';
import { Redirect } from 'react-router-dom';
import { getIsAuthenticated } from 'redux/modules/auth/selectors';

import Sidebar from 'components/Sidebar/Sidebar';

import styles from './app.module.scss';

interface Props {
  isAuthenticated?: boolean;
}

const Redirection = ({ path = '' }) => (
  <Redirect
    to={{
      pathname: path
    }}
  />
);

const AppContainer: React.FC<Props> = ({ isAuthenticated = false }) => {
  if (!isAuthenticated) {
    return <Redirection path="/login" />;
  }

  return (
    <div className={styles.app}>
      <Sidebar className={styles.sidebar} />
      <div className={styles['app-content']}>
        <Redirection path="/home" />;
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxTypes['state']) => ({
  isAuthenticated: getIsAuthenticated(state)
});

export default connect(
  mapStateToProps,
  null
)(AppContainer);
