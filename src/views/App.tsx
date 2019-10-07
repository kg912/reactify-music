import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import Login from 'views/Login';
import Home from 'views/Home/Home';

import styles from './app.module.scss';

interface Props {
  isAuthenticated?: boolean;
}

const AppContainer: React.FC<Props> = ({ isAuthenticated = false }) => {
  return (
    <Fragment>
      {isAuthenticated ? (
        <div className={styles.app}>
          <Sidebar className={styles.sidebar} />
          <div className={styles['app-content']}>
            <Route exact path="/" component={Home} />
          </div>
        </div>
      ) : (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      )}
    </Fragment>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer />
      <Route exact path="/login" component={Login} />
    </Router>
  );
};

export default App;
