import { createContext, useContext } from 'react';

export type OSTheme = 'win7' | 'macOS';
export type ColorMode = 'light' | 'dark';

export interface ThemeContextType {
  theme: OSTheme;
  setTheme: (theme: OSTheme) => void;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
