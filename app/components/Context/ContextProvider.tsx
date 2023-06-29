import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export type ThemeType = 'light' | 'dark' | null;
export type ThemeContextType = {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
} | null;

export const ThemeContext = createContext<ThemeContextType>(null);

const ThemeContextProvider = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useState<ThemeType>(null);

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
