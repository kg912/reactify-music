import React from 'react';
import classnames from 'classnames';

import { ACCENTS } from 'utils/constants';

import { noop } from 'helpers';

import styles from './button.module.scss';

const { transparent, colored } = styles;

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  accent?: string;
  className?: string;
  onClick: () => void;
  style?: React.CSSProperties;
  text?: string;
  ghost?: boolean;
}

const defaultProps: Readonly<ButtonProps> = {
  accent: ACCENTS.PURPLE,
  onClick: noop,
  text: ''
};

const Button: React.FC<ButtonProps> = ({
  accent = '',
  className = '',
  style,
  ghost,
  onClick,
  text
}) => {
  const appearance = ghost ? transparent : colored;

  const classes = classnames(styles[`btn-${accent}`], {
    [className]: !!className,
    [appearance]: true
  });

  return (
    <button className={classes} onClick={onClick} style={style}>
      {text}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
