import classnames from 'classnames';
import React from 'react';
import { ACCENTS, AccentType } from 'utils/constants';
import { Logo } from 'components';

import styles from './spinner.module.scss';

interface SpinnerProps {
  accent?: AccentType;
  className?: string;
  style?: React.CSSProperties;
}

const defaultProps: Readonly<SpinnerProps> = {
  accent: ACCENTS.TEAL
};

const Spinner: React.FC<SpinnerProps> = ({ accent, className = '', style }) => {
  return (
    <Logo
      className={classnames(styles[`spinner-${accent}`], {
        [className]: Boolean(className)
      })}
      fill={accent}
      strokeWidth={8}
    />
  );
};

Spinner.defaultProps = defaultProps;

export default Spinner;
