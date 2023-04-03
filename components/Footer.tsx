import Link from 'next/link';
import styles from '../styles/components/Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <Link className={styles.resume} href="/about_me">
      About me
    </Link>
  </footer>
);

export default Footer;
