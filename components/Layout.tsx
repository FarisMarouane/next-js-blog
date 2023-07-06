import { ReactElement } from 'react';
import styles from '../styles/components/Layout.module.css';
import BlogHeader from './BlogHeader';
import useClientPreferences from '../hooks/useClientPreferences';

const Layout = ({ children }: { children: ReactElement }) => {
  useClientPreferences();

  return (
    <div className={styles.layout}>
      <BlogHeader title="Marouane Faris" />
      {children}
    </div>
  );
};

export default Layout;
