import React from 'react';

import Icon from 'components/Icon';

import { noop, joinArray } from 'helpers';

import styles from './button.module.scss';

const { transparent, colored, rounded } = styles;

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  accent?: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  text?: string;
  ghost?: boolean;
  isRounded?: boolean;
  icon?: string;
}

const defaultProps: Readonly<ButtonProps> = {
  accent: 'purple',
  onClick: noop,
  isRounded: false,
  text: ''
};

const Button: React.FC<ButtonProps> = ({
  accent = '',
  className = '',
  isRounded,
  style,
  ghost,
  onClick,
  text,
  icon = 'cog',
  ...rest
}) => {
  const appearance = ghost ? transparent : colored;
  const roundedClass = isRounded ? rounded : '';

  const base = joinArray(styles[`btn-${accent}`], appearance, roundedClass);

  return (
    <div className={className}>
      <button className={base} onClick={onClick} style={style}>
        {icon && <Icon name={icon} />}
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = defaultProps;

export default Button;
