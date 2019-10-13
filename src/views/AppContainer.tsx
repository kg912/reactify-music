import React from 'react';
import { Redirect } from 'react-router-dom';
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

export default AppContainer;
