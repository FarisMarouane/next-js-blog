'use client';

import styles from '../styles/components/Footer.module.scss';
import { Locale } from '../i18n-config';
import { Link, usePathname } from '../src/navigation';

const Footer = ({
  locale,
  footerTranslation,
}: {
  locale: Locale;
  footerTranslation: string;
}) => {
  const pathname = usePathname();
  let route;

  if (pathname?.includes('/blog')) {
    route = {
      name: footerTranslation,
      path: '/',
    };
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
