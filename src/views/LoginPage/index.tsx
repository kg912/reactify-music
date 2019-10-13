import React from 'react';
import { connect } from 'react-redux';

import pageStyles from './login.module.scss';
import { toCamelCase } from 'helpers';

import { getAccent } from 'redux/modules/settings/selectors';
import ReduxTypes from 'redux/modules/moduleTypes';

import LoginForm from 'containers/LoginForm/LoginForm';

const styles = toCamelCase(pageStyles);

const Login = ({ accent = '' }) => {
  return (
    <div className={styles.pageContainer}>
      <LoginForm accent={accent} />
    </div>
  );
};

const mapStateToProps = (state: ReduxTypes['state']) => ({
  accent: getAccent(state)
});

export default connect(
  mapStateToProps,
  null
)(Login);
