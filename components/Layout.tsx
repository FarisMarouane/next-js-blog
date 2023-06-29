import { ReactElement } from 'react';
import styles from '../styles/components/Layout.module.css';
import BlogHeader from './BlogHeader';
import usePreferredColorScheme from '../hooks/usePreferredColorScheme';

const Layout = ({ children }: { children: ReactElement }) => {
  usePreferredColorScheme();

  return (
    <div className={styles.layout}>
      <BlogHeader title="Marouane Faris" />
      {children}
    </div>
  );
};

export default Layout;
