'use client';

import { ReactNode } from 'react';
import styles from './Layout.module.css';
import ThemeContextProvider from '../Context';
import BlogHeader from '../BlogHeader';
import usePreferredColorScheme from '../../hooks/usePreferredColorScheme';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <ThemeContextProvider>
        <Container>
          <BlogHeader title="Marouane Faris" />
          {children}
        </Container>
      </ThemeContextProvider>
    </div>
  );
};

export default Layout;

const Container = ({ children }: { children: ReactNode }) => {
  usePreferredColorScheme();

  return <>{children}</>;
};
