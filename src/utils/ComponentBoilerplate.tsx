import React from 'react';
import classnames from 'classnames';

interface Component {
  className?: string;
  style?: React.CSSProperties;
}

const Component: React.FC<Component> = ({ className = '', style }) => {
  const classes = classnames('styles.container', { [className]: !!className });

  return (
    <div className={classes} style={style}>
      CONTENT
    </div>
  );
};

export default Component;
