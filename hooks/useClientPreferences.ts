import { useContext, useEffect } from 'react';
import { ThemeContext, ThemeType } from '../components/ContextProvider';

const useClientPreferences = () => {
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const localStorageTheme = window.localStorage.getItem(
      'color-scheme',
    ) as ThemeType | null;

    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const bodyElement = document.querySelector('body');

    // apply a visibility class to the body to ensure there's no FOUC
    document.body.classList.add('body-visible');

    const listenToColorThemeChange = (event: MediaQueryListEvent) => {
      const isDarkMode = event.matches;

      if (isDarkMode) {
        bodyElement?.classList.add('dark');
        setTheme('dark');
      } else {
        bodyElement?.classList.remove('dark');
        setTheme('light');
      }
    };

    matchMedia.addEventListener('change', listenToColorThemeChange);

    if (localStorageTheme === 'dark') {
      bodyElement?.classList.add('dark');

      setTheme('dark');
    }

    if (localStorageTheme === 'light') {
      setTheme('light');
    }

    if (matchMedia.matches && localStorageTheme !== 'light') {
      bodyElement?.classList.add('dark');
      setTheme('dark');
    }

    return () => {
      // clean up by removing the class if the component unmounts
      document.body.classList.remove('body-visible');
      return matchMedia.removeEventListener('change', listenToColorThemeChange);
    };
  }, [setTheme]);
};

export default useClientPreferences;
