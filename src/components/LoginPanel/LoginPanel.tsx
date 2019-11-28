import React from 'react';
import styles from './loginpanel.module.scss';

import Blur from 'components/Blur';

interface Props {
  children: React.ReactNode;
}

const LoginPanel: React.FC<Props> = ({ children }) => (
  <div className={styles.panel}>
    <Blur type="minimal" />
    {children}
  </div>
);

export default LoginPanel;
