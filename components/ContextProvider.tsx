import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
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

const ThemeContextProvider = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useState<ThemeType>(undefined);

  useEffect(() => {
    if (theme) window.localStorage.setItem('color-scheme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
