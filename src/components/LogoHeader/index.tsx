import React from 'react';
import classnames from 'classnames';

import Logo from 'components/LogoHeader/Logo';
import { COLORS, SIDEBAR_TITLE } from 'utils/constants';

import styles from './logoHeader.module.scss';

interface LogoHeader {
  className?: string;
  style?: React.CSSProperties;
}

const LogoHeader: React.FC<LogoHeader> = ({ className = '', style = {} }) => {
  const classes = classnames(styles.header, {
    [className]: !!className
  });

  return (
    <div className={classes} style={style}>
      <Logo className={styles.logo} fill={COLORS.TEAL} />
      <div className={styles.title}>{SIDEBAR_TITLE}</div>
    </div>
  );
};

export default LogoHeader;
