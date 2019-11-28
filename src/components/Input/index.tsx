import React from 'react';
import classnames from 'classnames';
import { ACCENTS } from 'utils/constants';

import { toCamelCaseObject, noop } from 'helpers';
import Icon from 'components/Icon';

import styles from './input.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
  icon: string;
  accent?: string;
  className?: string;
  style?: React.CSSProperties;
  ghost?: boolean;
}

const defaultProps: Readonly<Props> = {
  accent: ACCENTS.TEAL,
  onChange: noop,
  icon: 'cog'
};

const Input: React.FC<Props> = ({
  accent,
  className = '',
  icon,
  style,
  onChange,
  ghost,
  ...rest
}) => {
  const appearance = ghost ? styles.ghost : styles.colored;

  const classes = classnames(styles[`input-container-${accent}`], {
    [className]: !!className,
    [appearance]: true
  });

  return (
    <div className={classes} style={style}>
      <Icon name={icon} />
      <input onChange={onChange} {...rest} />
    </div>
  );
};

Input.defaultProps = defaultProps;

export default React.memo(Input);
