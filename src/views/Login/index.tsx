import React from 'react';
import pageStyles from './login.module.scss';
import { toCamelCase } from 'helpers';

import LogoHeader from 'components/LogoHeader';
import Input from 'components/Input';
import Button from 'components/Button';

const styles = toCamelCase(pageStyles);

const Login = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <LogoHeader className={styles.loginHeader} />
        <Input
          className={styles.input}
          icon="contact"
          value=""
          onChange={() => {}}
          placeholder="Username"
        />
        <Input
          className={styles.input}
          icon="lock"
          value=""
          onChange={() => {}}
          placeholder="Password"
          type="password"
        />

        <div className={styles.buttons}>
          <Button text="Login" onClick={() => console.log('button CLICK')} />
          <Button text="Help" onClick={() => console.log('button CLICK')} />
        </div>
      </div>
    </div>
  );
};

export default Login;
