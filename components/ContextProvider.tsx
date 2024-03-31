'use client';

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

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => undefined,
});

const ContextProvider = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useState<ThemeType>(undefined);

  const themeContextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (theme) window.localStorage.setItem('color-scheme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
