import { useEffect, useContext, ReactElement } from 'react';
import styles from '../styles/Layout.module.css';
import { ThemeContext } from './ContextProvider';
import BlogHeader from './BlogHeader';

const Layout = ({ children }: { children: ReactElement }) => {
  const { setTheme } = useContext(ThemeContext);
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');

      const bodyElement = document.querySelector('body');
      bodyElement && bodyElement.classList.add('dark');
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
