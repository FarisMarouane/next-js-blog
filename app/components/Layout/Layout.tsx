'use client';

import { useEffect, useContext, ReactNode } from 'react';
import styles from './Layout.module.css';
import ContextProvider, { ThemeContext } from '../Context/ContextProvider';
import BlogHeader from '../BlogHeader/BlogHeader';

const Layout = ({ children }: { children: ReactNode }) => {
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
      <ContextProvider>
        <>
          <BlogHeader title="Marouane Faris" />
          {children}
        </>
      </ContextProvider>
    </div>
  );
};

export default Layout;
