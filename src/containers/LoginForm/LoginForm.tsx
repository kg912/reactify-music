import React, { useState } from 'react';
import pageStyles from './loginform.module.scss';
import { ACCENTS } from 'utils/constants';
import { toCamelCase, noop } from 'helpers';

import LogoHeader from 'components/LogoHeader';
import Input from 'components/Input';
import Button from 'components/Button';
import Blur from 'components/Blur';

const styles = toCamelCase(pageStyles);

interface Props {
  accent?: string;
}

const defaultProps: Readonly<Props> = {
  accent: ACCENTS.TEAL
};

const LoginForm: React.FC<Props> = ({ accent }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // @ts-ignore
  const onPasswordChange = (e: FormEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div className={styles.loginContainer}>
      <Blur type="minimal" />
      <LogoHeader className={styles.loginHeader} accent={accent} />
      <Input
        ghost
        className={styles.input}
        icon="contact"
        placeholder="Email"
        accent={accent}
      />
      <Input
        ghost
        value={password}
        className={styles.input}
        icon="lock"
        onChange={onPasswordChange}
        placeholder="Password"
        type="password"
        accent={accent}
      />

      <div className={styles.buttons}>
        <Button ghost text="Login" onClick={noop} accent={accent} />
        <Button ghost text="Help" onClick={noop} accent={accent} />
      </div>
    </div>
  );
};

LoginForm.defaultProps = defaultProps;

export default LoginForm;
