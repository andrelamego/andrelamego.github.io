import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { LanguageContext, type Language } from './language';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('lamego-language');
    return saved === 'en' ? 'en' : 'pt';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('lamego-language', newLanguage);
  };

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage(language === 'pt' ? 'en' : 'pt'),
  }), [language]);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
