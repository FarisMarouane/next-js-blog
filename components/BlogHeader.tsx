import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';

import { ThemeContext } from './ContextProvider';
import styles from '../styles/components/Header.module.css';
import ToggleInput from './Toggle';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

const BlogHeader = ({ title }: { title: string }) => {
  const { pathname, locale, query } = useRouter();
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    const bodyElement = document.querySelector('body');

    if (bodyElement) {
      const classList = bodyElement.classList;

      if (classList.contains('dark')) {
        classList.remove('dark');
        setTheme('light');
      } else {
        classList.add('dark');
        setTheme('dark');
      }
    }
  };

  return (
    <header className={`${styles.header} ${font.className}`}>
      {pathname === '/' ? (
        <h1 className={styles.primaryTitle}>
          <Link className={`blogTitle ${styles.link}`} href="/">
            {title}
          </Link>
        </h1>
      ) : (
        <h3 className={`${styles.tertiaryTitle}`}>
          <Link className={`blogTitle ${styles.link}`} href="/">
            {title}
          </Link>
        </h3>
      )}
      <div className={styles.controlGroup}>
        <ToggleInput
          checked={theme === 'dark' ? true : false}
          onChange={toggleDarkMode}
        />
        <div className={styles.langButtons}>
          <Link
            locale="en"
            href={{ pathname, query }}
            className={` languageLink ${styles.langLink} ${
              locale === 'en' && styles.langLinkSelected
            }`}
          >
            Eng
          </Link>
          <span className={styles.seperator} />
          <Link
            locale="fr"
            href={{ pathname, query }}
            className={`languageLink ${styles.langLink} ${
              locale === 'fr' && styles.langLinkSelected
            }`}
          >
            Fr
          </Link>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
