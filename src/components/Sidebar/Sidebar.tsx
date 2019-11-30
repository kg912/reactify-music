import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toCamelCaseObject, noop } from 'helpers';

import LogoHeader from 'components/LogoHeader';
import Button from 'components/Button';
import { actions } from 'redux/modules/auth';

import SidebarSection from './SidebarSection';

import sidebarStyles from './sidebar.module.scss';

interface Props {
  style?: React.CSSProperties;
  className?: string;
  logoutFromApp: () => void;
}

const defaultProps: Readonly<Props> = {
  logoutFromApp: noop
};

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

const Sidebar: React.FC<Props> = ({ style, className = '', logoutFromApp }) => {
  const classes = classnames(styles.sidebarContainer, {
    [className]: !!className
  });

  return (
    <nav className={classes}>
      <LogoHeader />
      <div className={styles.sidebarContent}>
        <SidebarSection {...dummySection} />
      </div>
      <Button
        danger
        onClick={logoutFromApp}
        className={sidebarStyles['sidebar-footer-button']}
        text="Logout"
      />
    </nav>
  );
};

Sidebar.defaultProps = defaultProps;

const mapActionsToProps = {
  logoutFromApp: actions.logout
};

export default connect(null, mapActionsToProps)(Sidebar);
