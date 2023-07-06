import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/components/Footer.module.scss';
import { getI18nText } from '../utils/getI18nText';

const Footer = ({ locale }: { locale: 'en' | 'fr' }) => {
  const { pathname } = useRouter();
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
