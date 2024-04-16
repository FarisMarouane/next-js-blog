'use client';

import { ReactNode, useEffect } from 'react';
import { Merriweather } from 'next/font/google';
import styles from '../styles/components/Layout.module.css';
import BlogHeader from './BlogHeader';
import useClientPreferences from '../hooks/useClientPreferences';
import { Locale } from '../i18n-config';
import { useParams } from 'next/navigation';

const font = Merriweather({ subsets: ['latin'], weight: '400' });

const Layout = ({ children }: { children: ReactNode }) => {
  useClientPreferences();

  const { locale } = useParams<{ locale: Locale }>();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((serviceWorker) => {
          // eslint-disable-next-line no-console
          console.log('Service Worker registered: ', serviceWorker);
        })
        .catch((error) => {
          console.error('Error registering the Service Worker: ', error);
        });
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
  }, [locale]);

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
      <BlogHeader locale={locale} title="Marouane Faris" />
      {children}
    </div>
  );
};

export default Layout;
