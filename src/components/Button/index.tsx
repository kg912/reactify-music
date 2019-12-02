import React from 'react';

import Icon from 'components/Icon';

import { noop, joinArray } from 'helpers';

import styles from './button.module.scss';

const { transparent, colored, rounded } = styles;

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  accent?: string;
  className?: string;
  danger?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  text?: string;
  ghost?: boolean;
  isRounded?: boolean;
  icon?: string;
}

const defaultProps: Readonly<ButtonProps> = {
  accent: 'teal',
  danger: false,
  onClick: noop,
  isRounded: false,
  text: ''
};

const Button: React.FC<ButtonProps> = ({
  accent,
  className,
  danger,
  isRounded,
  style,
  ghost,
  onClick,
  text,
  icon,
  ...rest
}) => {
  const appearance = ghost ? transparent : colored;
  const roundedClass = isRounded ? rounded : '';
  const dangerRed = (danger && styles.danger) || '';

  const base = joinArray(
    styles[`btn-${accent}`],
    appearance,
    roundedClass,
    dangerRed
  );

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
