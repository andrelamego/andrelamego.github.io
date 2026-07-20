import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { ThemeContext, type ColorMode, type OSTheme } from './theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<OSTheme>(() => {
    const saved = localStorage.getItem('lamego-os-theme');
    // Migrate legacy 'lamegoOS' theme to 'macOS'
    if (saved === 'lamegoOS') return 'macOS';
    return (saved as OSTheme) || 'macOS';
  });

  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    const saved = localStorage.getItem('lamego-os-color-mode');
    return (saved as ColorMode) || 'dark';
  });

  const setTheme = (newTheme: OSTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('lamego-os-theme', newTheme);
  };

  const setColorMode = (newMode: ColorMode) => {
    setColorModeState(newMode);
    localStorage.setItem('lamego-os-color-mode', newMode);
  };

  useEffect(() => {
    document.body.className = `theme-${theme} ${colorMode}`;
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme, colorMode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
