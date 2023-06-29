import { useContext, useEffect } from 'react';
import { ThemeContext, ThemeType } from '../components/ContextProvider';

const usePreferredColorScheme = () => {
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const localStorageTheme = window.localStorage.getItem(
      'color-scheme',
    ) as ThemeType | null;
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const bodyElement = document.querySelector('body');

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

    return () =>
      matchMedia.removeEventListener('change', listenToColorThemeChange);
  }, [setTheme]);
};

export default usePreferredColorScheme;
