import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/components/Footer.module.scss';

const Footer = () => {
  const { pathname } = useRouter();
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
