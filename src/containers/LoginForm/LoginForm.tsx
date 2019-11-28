import React, { useState, FormEvent } from 'react';
import pageStyles from './loginform.module.scss';
import { ACCENTS, AccentType } from 'utils/constants';
import { toCamelCaseObject, noop } from 'helpers';

import LoginPanel from 'components/LoginPanel/LoginPanel';
import LogoHeader from 'components/LogoHeader';
import Input from 'components/Input';
import Button from 'components/Button';

const styles = toCamelCaseObject(pageStyles);

interface Props {
  accent?: AccentType;
}

const defaultProps: Readonly<Props> = {
  accent: 'teal'
};

const LoginForm: React.FC<Props> = ({ accent = 'teal' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LoginPanel>
      <LogoHeader className={styles.loginHeader} accent={accent} />
      <Input
        ghost
        value={email}
        className={styles.input}
        icon="contact"
        onChange={({ currentTarget }: FormEvent<HTMLInputElement>) =>
          setEmail(currentTarget.value)
        }
        placeholder="Email"
        accent={accent}
      />
      <Input
        ghost
        value={password}
        className={styles.input}
        icon="lock"
        onChange={({ currentTarget }: FormEvent<HTMLInputElement>) =>
          setPassword(currentTarget.value)
        }
        placeholder="Password"
        type="password"
        accent={accent}
      />

      <div className={styles.buttons}>
        <Button ghost text="Login" onClick={noop} accent={accent} />
        <Button ghost text="Help" onClick={noop} accent={accent} />
      </div>
    </LoginPanel>
  );
};

LoginForm.defaultProps = defaultProps;

export default LoginForm;
