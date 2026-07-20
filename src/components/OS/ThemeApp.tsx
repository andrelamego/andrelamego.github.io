import React from 'react';
import { useTheme, type OSTheme } from '../../contexts/theme';
import { LayoutTemplate, Apple, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../contexts/language';

const themes: { id: OSTheme; name: string; icon: React.ReactNode; description: { pt: string; en: string } }[] = [
  { id: 'macOS', name: 'macOS', icon: <Apple size={24} />, description: { pt: 'A elegância da maçã, com dock e menu superior.', en: 'Apple-inspired elegance with a dock and top menu.' } },
  { id: 'win7', name: 'Windows 7', icon: <LayoutTemplate size={24} />, description: { pt: 'O visual Aero Glass autêntico com transparências clássicas.', en: 'Authentic Aero Glass styling with classic transparency.' } },
];

export const ThemeApp: React.FC = () => {
  const { theme, setTheme, colorMode, setColorMode } = useTheme();
  const { language } = useLanguage();
  const text = language === 'pt'
    ? {
        title: 'Aparência e Temas',
        intro: 'Personalize a experiência do sistema operacional selecionando um dos temas abaixo.',
        osTheme: 'Tema do SO',
        active: 'Tema Ativo',
        colorMode: 'Modo de Cor',
        light: 'Claro',
        dark: 'Escuro',
      }
    : {
        title: 'Appearance and Themes',
        intro: 'Customize the operating system experience by selecting one of the themes below.',
        osTheme: 'OS Theme',
        active: 'Active Theme',
        colorMode: 'Color Mode',
        light: 'Light',
        dark: 'Dark',
      };

  return (
    <div className="h-full w-full bg-white/90 dark:bg-black/50 backdrop-blur-md text-black dark:text-white p-6 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-2 text-black dark:text-white">{text.title}</h2>
      <p className="text-black/60 dark:text-white/60 mb-8">{text.intro}</p>

      <h3 className="text-xl font-bold mb-4 text-black dark:text-white">{text.osTheme}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
              theme === t.id
                ? 'border-purple-500 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            <div className={`p-3 rounded-lg mb-4 ${theme === t.id ? 'bg-purple-500/30 text-purple-600 dark:text-purple-300' : 'bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80'}`}>
              {t.icon}
            </div>
            <h3 className="text-xl font-bold mb-1">{t.name}</h3>
            <p className="text-sm text-black/60 dark:text-white/60">{t.description[language]}</p>
            
            {theme === t.id && (
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                {text.active}
              </div>
            )}
          </button>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4 text-black dark:text-white">{text.colorMode}</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setColorMode('light')}
          className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
            colorMode === 'light'
              ? 'border-blue-500 bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
              : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
          }`}
        >
          <Sun size={20} className={colorMode === 'light' ? 'text-blue-600 dark:text-blue-400' : 'text-black/80 dark:text-white/80'} />
          <span className="font-semibold text-black dark:text-white">{text.light}</span>
        </button>

        <button
          onClick={() => setColorMode('dark')}
          className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
            colorMode === 'dark'
              ? 'border-indigo-500 bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
              : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
          }`}
        >
          <Moon size={20} className={colorMode === 'dark' ? 'text-indigo-600 dark:text-indigo-400' : 'text-black/80 dark:text-white/80'} />
          <span className="font-semibold text-black dark:text-white">{text.dark}</span>
        </button>
      </div>
    </div>
  );
};
