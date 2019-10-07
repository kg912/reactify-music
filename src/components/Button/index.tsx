import React from 'react';
import classnames from 'classnames';

import { noop } from 'helpers';

import styles from './button.module.scss';

interface Button {
  className?: string;
  onClick: () => void;
  style?: React.CSSProperties;
  text?: string;
}

const Button: React.FC<Button> = ({
  className = '',
  style,
  onClick = noop,
  text = ''
}) => {
  const classes = classnames(styles.btn, {
    [className]: !!className
  });

  return (
    <button className={classes} onClick={onClick} style={style}>
      {text}
    </button>
  );
};

export default Button;
