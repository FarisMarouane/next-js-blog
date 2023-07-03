import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';

import { LanguageContext, ThemeContext } from './ContextProvider';
import styles from '../styles/components/Header.module.css';
import ToggleInput from './Toggle';
import Button from './button';

const font = Montserrat({ subsets: ['latin'], weight: '900' });

const BlogHeader = ({ title }: { title: string }) => {
  const { pathname } = useRouter();
  const { theme, setTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);

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

  const onLanguageSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setLanguage(e.currentTarget.value as 'eng' | 'fr');
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
          <Button
            selected={language === 'eng'}
            onClick={onLanguageSelect}
            value="eng"
            className={`${styles.langButton} ${
              language === 'eng' && styles.langButtonSelected
            }`}
          >
            Eng
          </Button>
          <span className={styles.seperator} />
          <Button
            selected={language === 'fr'}
            value="fr"
            onClick={onLanguageSelect}
            className={`${styles.langButton} ${
              language === 'fr' && styles.langButtonSelected
            }`}
          >
            Fr
          </Button>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
