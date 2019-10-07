import React from 'react';
import classnames from 'classnames';

import { toCamelCase, noop } from 'helpers';

import Icon from 'components/Icon';

import inputStyles from './input.module.scss';

interface Input {
  icon: string;
  value: string;
  onChange: () => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  type?: string;
}

const styles = toCamelCase(inputStyles);

const Input: React.FC<Input> = ({
  className = '',
  icon,
  style,
  value = '',
  onChange = noop,
  type = '',
  ...rest
}) => {
  const classes = classnames(styles.inputContainer, {
    [className]: !!className
  });

  return (
    <div className={classes} style={style}>
      <Icon name={icon} />
      <input defaultValue={value} onChange={onChange} type={type} {...rest} />
    </div>
  );
};

export default React.memo(Input);
