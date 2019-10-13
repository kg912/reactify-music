import React from 'react';
import classnames from 'classnames';

import Logo from 'components/LogoHeader/Logo';
import { COLORS, SIDEBAR_TITLE, ACCENTS } from 'utils/constants';
import getColorFromAccent from 'helpers/getColorFromAccent';

import styles from './logoHeader.module.scss';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  accent?: string;
}

const defaultProps: Readonly<Props> = {
  accent: ACCENTS.TEAL,
  className: '',
  style: {}
};

const LogoHeader: React.FC<Props> = ({
  accent = '',
  className = '',
  style
}) => {
  const color = getColorFromAccent(accent.toUpperCase());

  const classes = classnames(styles.header, {
    [className]: !!className
  });

  return (
    <div className={classes} style={style}>
      <Logo className={styles.logo} fill={color} />
      <div className={styles[`title-${accent}`]}>{SIDEBAR_TITLE}</div>
    </div>
  );
};

LogoHeader.defaultProps = defaultProps;

export default LogoHeader;
