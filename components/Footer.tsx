import Link from 'next/link';
import styles from '../styles/components/Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <a
      href="https://twitter.com/MarouaneFaris1"
      target="_blank"
      rel="noreferrer"
    >
      Twitter
    </a>{' '}
    <div>
      &nbsp; &bull; &nbsp;
      <a
        href="https://github.com/FarisMarouane/next-js-blog"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>{' '}
    </div>
    <div>
      &nbsp; &bull; &nbsp;
      <a
        href="https://stackoverflow.com/users/6375543/faris-marouane"
        target="_blank"
        rel="noreferrer"
      >
        Stackoverflow
      </a>
    </div>
    <Link className={styles.resume} href="/about_me">
      About me
    </Link>
  </footer>
);

export default Footer;
