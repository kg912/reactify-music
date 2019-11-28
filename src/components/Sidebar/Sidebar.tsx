import React from 'react';
import classnames from 'classnames';
import { toCamelCaseObject } from 'helpers';

import LogoHeader from 'components/LogoHeader';

import SidebarSection from './SidebarSection';

import sidebarStyles from './sidebar.module.scss';

interface Sidebar {
  style?: React.CSSProperties;
  className?: string;
}

const styles: { [s: string]: string } = toCamelCaseObject(sidebarStyles);

const list = [...Array(5).keys()].reduce(
  (acc: string[], curr: number): string[] => {
    return [...acc, `subsection-${curr}`];
  },
  []
);

const dummySection = {
  section: {
    sectionTitle: 'Your Music',
    items: list.map(item => ({
      title: item,
      action: () => {},
      icon: 'heart'
    }))
  }
};

const Sidebar: React.FC<Sidebar> = ({ style, className = '' }) => {
  const classes = classnames(styles.sidebarContainer, {
    [className]: !!className
  });

  return (
    <nav className={classes}>
      <LogoHeader />
      <div className={styles.sidebarContent}>
        <SidebarSection {...dummySection} />
      </div>
    </nav>
  );
};

export default Sidebar;
