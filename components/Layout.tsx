'use client';

import { ReactNode } from 'react';
import { Merriweather } from 'next/font/google';
import styles from '../styles/components/Layout.module.css';
import BlogHeader from './BlogHeader';
import useClientPreferences from '../hooks/useClientPreferences';

const font = Merriweather({ subsets: ['latin'], weight: '400' });

const Layout = ({ children }: { children: ReactNode }) => {
  useClientPreferences();

  return (
    <div className={styles.layout}>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
          font-weight: 400;
          word-wrap: break-word;
          font-kerning: normal;
        }
      `}</style>
      <BlogHeader title="Marouane Faris" />
      {children}
    </div>
  );
};

export default Layout;
