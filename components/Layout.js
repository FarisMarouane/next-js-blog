import { useEffect, useContext } from 'react';
import styles from '../styles/Layout.module.css';
import { ThemeContext } from './ContextProvider';
import BlogHeader from './BlogHeader';

const Layout = ({ children }) => {
  const { setTheme } = useContext(ThemeContext);
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.querySelector('body').classList.add('dark');
    }
  }, [setTheme]);
  return (
    <div className={styles.layout}>
      <BlogHeader title="Marouane Faris" />
      {children}
    </div>
  );
};

export default Layout;
