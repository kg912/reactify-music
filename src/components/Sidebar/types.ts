interface SectionItem {
  title: string;
  action: () => void;
  icon: string;
}

interface Section {
  sectionTitle: string;
  items: SectionItem[];
}

export interface SidebarSection {
  section: Section;
  style?: React.CSSProperties;
  className?: string;
}
