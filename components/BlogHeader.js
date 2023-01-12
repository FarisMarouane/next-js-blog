import { useRouter } from 'next/router';
import styles from '../styles/components/Header.module.css';
import Link from 'next/link';

import { Montserrat } from '@next/font/google';
import ToggleInput from './Toggle';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

const BlogHeader = ({ title }) => {
  const { pathname } = useRouter();
  const toggleDarkMode = () => {
    document.querySelector('body').classList.toggle('dark');
  };

  return (
    <header className={`${styles.header} ${font.className}`}>
      {pathname === '/' ? (
        <h1 className={styles.primaryTitle}>
          <Link className={`${styles.link}`} href="/">
            {title}
          </Link>
        </h1>
      ) : (
        <h3 className={`${styles.tertiaryTitle}`}>
          <Link className={styles.link} href="/">
            Overreacted
          </Link>
        </h3>
      )}
      <ToggleInput onChange={toggleDarkMode} />
    </header>
  );
};

export default BlogHeader;
