import React from 'react';
import classnames from 'classnames';

import { toCamelCase } from 'helpers';

import sectionStyles from './sidebarSection.module.scss';
import SidebarItem from './SidebarItem';
import { SidebarSection as SidebarSectionProps } from './types';

const styles = toCamelCase(sectionStyles);

const SidebarSection: React.FC<SidebarSectionProps> = ({
  section: { sectionTitle, items }
}) => {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{sectionTitle}</h3>
      <div className={styles.sectionItems}>
        {items.map((item, index) => (
          <SidebarItem {...item} key={`ITEM_${index}`} />
        ))}
      </div>
    </section>
  );
};

export default SidebarSection;
