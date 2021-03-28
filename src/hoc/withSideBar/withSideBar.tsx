import React from 'react';
import { connect } from 'react-redux';
import ReduxTypes from 'redux/modules/moduleTypes';
import { getIsAuthenticated } from 'redux/modules/auth/selectors';
import { actions } from 'redux/modules/auth';

import Sidebar from 'components/Sidebar/Sidebar';

import styles from './withsidebar.module.scss';

const mapStateToProps = (state: ReduxTypes['state']) => ({
  isAuthenticated: getIsAuthenticated(state)
});

const mapActionToProps = {
  logout: actions.logout
};

function withSideBar(WrappedComponent: React.ComponentClass) {
  class HOCComponent extends React.Component {
    render() {
      return (
        <div className={styles.app}>
          <Sidebar className={styles.sidebar} />
          <div className={styles['app-content']}>
            <WrappedComponent {...this.props} />;
          </div>
        </div>
      );
    }
  }

  return connect(mapStateToProps, mapActionToProps)(HOCComponent);
}

export default withSideBar;
