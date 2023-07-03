import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
} from 'react';

export type ThemeType = 'light' | 'dark' | undefined;
export type ThemeContextType = {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
};

export type LanguageType = 'eng' | 'fr' | undefined;
export type LanguageContextType = {
  language: LanguageType;
  setLanguage: Dispatch<SetStateAction<LanguageType>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => undefined,
});

export const LanguageContext = createContext<LanguageContextType>({
  language: 'eng',
  setLanguage: () => undefined,
});

const ContextProvider = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useState<ThemeType>(undefined);
  const [language, setLanguage] = useState<LanguageType>(undefined);

  const themeContextValue = useMemo(() => ({ theme, setTheme }), [theme]);
  const languageContextValue = useMemo(
    () => ({ language, setLanguage }),
    [language],
  );

  useEffect(() => {
    if (theme) window.localStorage.setItem('color-scheme', theme);
  }, [theme]);

  useEffect(() => {
    if (language) window.localStorage.setItem('preferred-language', language);
  }, [language]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LanguageContext.Provider value={languageContextValue}>
        {children}
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
