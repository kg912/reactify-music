import React from 'react';
import classnames from 'classnames';

import styles from './blur.module.scss';

interface Props {
  className?: string;
  type?: 'minimal' | 'moderate' | 'adequate' | 'intense';
}

const defaultProps: Readonly<Props> = {
  className: styles.default,
  type: 'moderate'
};

const Blur: React.FC<Props> = ({ className = '', type }) => (
  <div className={classnames(styles[`blur-${type}`], className)} />
);

Blur.defaultProps = defaultProps;

export default Blur;
