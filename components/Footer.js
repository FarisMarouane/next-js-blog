import Link from 'next/link';
import styles from '../styles/components/Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <a
      href="https://twitter.com/MarouaneFaris1"
      target="_blank"
      rel="noreferrer"
    >
      Twitter
    </a>{' '}
    &nbsp; &bull; &nbsp;
    <a
      href="https://github.com/FarisMarouane/"
      target="_blank"
      rel="noreferrer"
    >
      Github
    </a>{' '}
    &nbsp; &bull; &nbsp;
    <a
      href="https://stackoverflow.com/users/6375543/faris-marouane"
      target="_blank"
      rel="noreferrer"
    >
      Stackoverflow
    </a>
    <Link className={styles.resume} href="/">
      Resume
    </Link>
  </footer>
);

export default Footer;
