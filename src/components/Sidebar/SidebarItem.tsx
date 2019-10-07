import React from 'react';
import classnames from 'classnames';

import Icon from 'components/Icon';

import itemStyles from './sidebarItem.module.scss';
import { toCamelCase } from 'helpers';

const styles: { [s: string]: string } = toCamelCase(itemStyles);

interface SidebarItem {
  title: string;
  icon: string;
  action: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const SidebarItem: React.FC<SidebarItem> = ({
  title = '',
  icon,
  action,
  className = ''
}) => {
  const classes = classnames(styles.itemContainer, {
    [className]: !!className
  });

  return (
    <div className={classes} onClick={action}>
      <div className={styles.itemContent}>
        <Icon name={icon} />
        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
};

export default React.memo(SidebarItem);
