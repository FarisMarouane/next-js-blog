'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
  const pathname = usePathname();
  let route;

  if (pathname === '/blog') {
    route = { name: 'About me', path: '/' };
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
