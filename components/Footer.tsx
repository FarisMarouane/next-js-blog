'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/components/Footer.module.scss';
import { getI18nText } from '../utils/getI18nText';
import { Locale } from '../i18n-config';

const Footer = ({ locale }: { locale: Locale }) => {
  const pathname = usePathname();
  let route;

  if (pathname === '/blog') {
    route = { name: getI18nText('footer_about_me', locale), path: '/' };
  } else {
    route = { name: 'Blog', path: '/blog' };
  }

  return (
    <footer className={styles.footer}>
      <Link className={styles.resume} href={route.path}>
        {route.name}
      </Link>
    </footer>
  );
};

export default Footer;
