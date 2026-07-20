import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal, User, Briefcase, Mail, Settings, Apple, Wifi, Battery, Languages, MousePointerClick, Keyboard, FileText, X } from 'lucide-react';
import { Window } from './components/OS/Window';
import { DesktopIcon } from './components/OS/DesktopIcon';
import { useTheme, type OSTheme } from './contexts/theme';
import { useIsMobile } from './hooks/useIsMobile';
import { useLanguage, type Language } from './contexts/language';
import { getProjectsData } from './data/projectsData';

// Lazy-loaded app components — each becomes its own chunk
const PortfolioContent = lazy(() => import('./components/Portfolio/PortfolioContent').then(m => ({ default: m.PortfolioContent })));
const ResumeTerminal = lazy(() => import('./components/OS/ResumeTerminal').then(m => ({ default: m.ResumeTerminal })));
const ContactApp = lazy(() => import('./components/OS/ContactApp').then(m => ({ default: m.ContactApp })));
const ThemeApp = lazy(() => import('./components/OS/ThemeApp').then(m => ({ default: m.ThemeApp })));
const BootSequence = lazy(() => import('./components/OS/BootSequence').then(m => ({ default: m.BootSequence })));
const ProjectsApp = lazy(() => import('./components/OS/ProjectsApp').then(m => ({ default: m.ProjectsApp })));
const ProjectViewer = lazy(() => import('./components/OS/ProjectViewer').then(m => ({ default: m.ProjectViewer })));

// Minimal loading fallback for Suspense boundaries
const AppLoader = () => (
  <div className="w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
  </div>
);

type AppWindow = {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
};

type WelcomeText = {
  title: string;
  intro: string;
  tips: string[];
  primary: string;
  secondary: string;
  close: string;
};

const Win7StartOrb = () => (
  <svg viewBox="0 0 100 100" className="w-[110%] h-[110%] mt-[-5%] ml-[-5%] transition-transform duration-200">
    <circle cx="50" cy="50" r="48" fill="url(#orbGrad)" stroke="url(#orbStroke)" strokeWidth="2" />
    <defs>
      <linearGradient id="orbGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4bb9f8" />
        <stop offset="40%" stopColor="#2076c8" />
        <stop offset="50%" stopColor="#14529b" />
        <stop offset="100%" stopColor="#0b3764" />
      </linearGradient>
      <linearGradient id="orbStroke" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
      </linearGradient>
      <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
      </radialGradient>
      <filter id="logoShadow">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.5"/>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#orbGlow)" />
    
    <g filter="url(#logoShadow)">
      <path d="M 28,48 Q 36,44 46,48 L 46,28 Q 36,25 28,29 Z" fill="#f14a38" />
      <path d="M 49,48 Q 60,52 72,48 L 72,25 Q 60,28 49,24 Z" fill="#87bd33" />
      <path d="M 28,51 Q 36,55 46,51 L 46,71 Q 36,74 28,70 Z" fill="#00a1f0" />
      <path d="M 49,51 Q 60,47 72,51 L 72,74 Q 60,71 49,75 Z" fill="#ffb800" />
    </g>

    <path d="M 8 50 A 42 42 0 0 1 92 50 A 60 25 0 0 0 8 50" fill="#ffffff" fillOpacity="0.5" />
  </svg>
);

type ThemeConfigEntry = {
  wallpaper: string;
  taskbar: string;
  taskbarJustify: string;
  startBtn: string;
  startBtnActive: string;
  startBtnHover: string;
  startIcon: React.ReactNode;
  windowIcon: string;
  windowIconHover: string;
  isMacOS: boolean;
  isIOS?: boolean;
};

const themeConfig: Record<OSTheme | 'iOS', ThemeConfigEntry> = {
  win7: {
    wallpaper: "bg-[url('https://images.unsplash.com/photo-1617469165786-8007eda3caa7?q=80&w=2670&auto=format&fit=crop')]",
    taskbar: "bottom-0 left-0 w-full h-10 bg-white/50 dark:bg-black/30 backdrop-blur-md border-t border-white/80 dark:border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]",
    taskbarJustify: "justify-between",
    startBtn: "w-[48px] h-[48px] -ml-2 -mt-2 group relative z-50",
    startBtnActive: "brightness-90 scale-95",
    startBtnHover: "brightness-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]",
    startIcon: <Win7StartOrb />,
    windowIcon: "bg-white/40 dark:bg-white/20 text-black dark:text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.8),0_0_5px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_10px_rgba(255,255,255,0.4),0_0_5px_rgba(255,255,255,0.3)] border border-white/60 dark:border-white/40 rounded-md",
    windowIconHover: "hover:bg-white/60 dark:hover:bg-white/10 text-black/90 dark:text-white/90 border border-white/80 dark:border-transparent hover:dark:border-white/20 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.6)] dark:hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] rounded-md",
    isMacOS: false,
  },
  macOS: {
    wallpaper: "bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop')]",
    taskbar: "top-0 left-0 w-full h-7 bg-white/40 dark:bg-black/20 backdrop-blur-xl border-b border-black/10 dark:border-white/10 text-xs font-semibold px-4",
    taskbarJustify: "justify-between",
    startBtn: "h-7 px-2 flex items-center justify-center transition-colors",
    startBtnActive: "bg-black/10 dark:bg-white/20",
    startBtnHover: "hover:bg-black/5 dark:hover:bg-white/10",
    startIcon: <Apple size={14} className="text-black dark:text-white drop-shadow-sm dark:drop-shadow-md" />,
    windowIcon: "hidden", // Handled by a bottom dock in macOS
    windowIconHover: "hidden",
    isMacOS: true,
  },
  iOS: {
    wallpaper: "bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop')]", // Same as macOS or specific iOS
    taskbar: "hidden",
    taskbarJustify: "hidden",
    startBtn: "hidden",
    startBtnActive: "hidden",
    startBtnHover: "hidden",
    startIcon: <div/>,
    windowIcon: "hidden",
    windowIconHover: "hidden",
    isMacOS: false,
    isIOS: true,
  }
};

const WelcomeOverlay = ({
  text,
  language,
  onLanguageChange,
  onClose,
  onOpenPortfolio,
  onOpenTerminal,
}: {
  text: WelcomeText;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onClose: () => void;
  onOpenPortfolio: () => void;
  onOpenTerminal: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-[200] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm"
  >
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/20 bg-white/85 text-black shadow-2xl backdrop-blur-2xl dark:bg-[#111114]/90 dark:text-white"
    >
      <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6 dark:border-white/10">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-black/40 dark:text-white/35">Lamego OS</p>
          <h2 className="text-2xl font-bold tracking-tight">{text.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-black/60 dark:text-white/55">{text.intro}</p>
          <div className="mt-5 inline-flex rounded-full border border-black/10 bg-black/5 p-1 dark:border-white/10 dark:bg-white/5">
            {(['pt', 'en'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onLanguageChange(option)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                  language === option
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white'
                }`}
                aria-pressed={language === option}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 text-black/55 transition-colors hover:bg-black/10 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"
          aria-label={text.close}
        >
          <X size={17} />
        </button>
      </div>

      <div className="grid gap-3 p-6">
        {[MousePointerClick, Keyboard, Languages, FileText].map((Icon, index) => (
          <div key={text.tips[index]} className="flex items-start gap-3 rounded-xl border border-black/10 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/65">
              <Icon size={16} />
            </div>
            <p className="text-sm leading-relaxed text-black/65 dark:text-white/60">{text.tips[index]}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-black/10 p-6 dark:border-white/10 sm:flex-row">
        <button
          onClick={onOpenPortfolio}
          className="flex-1 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 dark:bg-white dark:text-black"
        >
          {text.primary}
        </button>
        <button
          onClick={onOpenTerminal}
          className="flex-1 rounded-xl border border-black/10 bg-black/5 px-5 py-3 text-sm font-semibold text-black/75 transition-colors hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
        >
          {text.secondary}
        </button>
      </div>
    </motion.div>
  </motion.div>
);

function App() {
  const { theme } = useTheme();
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const isMobile = useIsMobile();
  const [hasBooted, setHasBooted] = useState(() => {
    return sessionStorage.getItem('hasBooted') === 'true';
  });

  const handleBootComplete = useCallback(() => {
    setHasBooted(true);
    sessionStorage.setItem('hasBooted', 'true');
  }, []);

  const currentTheme = isMobile ? themeConfig.iOS : (themeConfig[theme] || themeConfig.macOS);
  const appText = useMemo(() => language === 'pt'
    ? {
        portfolio: 'Sobre Mim',
        portfolioWindow: 'Sobre Mim - Lamego',
        projects: 'Projetos',
        terminal: 'Terminal CV',
        contact: 'Contato',
        themes: 'Aparência',
        engineer: 'Engenheiro de Software',
        finder: 'Finder',
        file: 'Arquivo',
        edit: 'Editar',
        view: 'Visualizar',
        languageLabel: 'English version',
        welcome: {
          title: 'Bem-vindo ao Lamego OS',
          intro: 'Esta interface funciona como um pequeno sistema operacional para explorar currículo, projetos e contato de forma rápida.',
          tips: [
            'Clique uma vez nos ícones do desktop, dock ou menu iniciar para abrir as janelas.',
            'Use o Terminal CV para consultar comandos como about, projects, cv, contact, languages, stack backend e whyhire.',
            'O seletor PT/EN troca o conteúdo principal entre português e inglês.',
            'Os cards de projetos abrem janelas internas com detalhes técnicos; os links de repositório ficam dentro dessas janelas.',
          ],
          primary: 'Abrir Sobre Mim',
          secondary: 'Abrir Terminal CV',
          close: 'Fechar boas-vindas',
        },
      }
    : {
        portfolio: 'About Me',
        portfolioWindow: 'About Me - Lamego',
        projects: 'Projects',
        terminal: 'CV Terminal',
        contact: 'Contact',
        themes: 'Appearance',
        engineer: 'Software Engineer',
        finder: 'Finder',
        file: 'File',
        edit: 'Edit',
        view: 'View',
        languageLabel: 'Versão em português',
        welcome: {
          title: 'Welcome to Lamego OS',
          intro: 'This interface works like a small operating system for quickly exploring my resume, projects and contact information.',
          tips: [
            'Click desktop, dock or start-menu icons once to open windows.',
            'Use the CV Terminal to run commands like about, projects, cv, contact, languages, stack backend and whyhire.',
            'The PT/EN control switches the main content between Portuguese and English.',
            'Project cards open internal detail windows; repository links are available inside those windows.',
          ],
          primary: 'Open About Me',
          secondary: 'Open CV Terminal',
          close: 'Close welcome',
        },
      }, [language]);

  const getWindowConfig = useCallback((id: string): AppWindow | null => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const wrap = (node: React.ReactNode) => <Suspense fallback={<AppLoader />}>{node}</Suspense>;
    
    if (id === 'portfolio') return { id, title: appText.portfolioWindow, content: wrap(<PortfolioContent />), defaultSize: { width: Math.min(1000, w - 40), height: Math.min(700, h - 100) }, defaultPosition: { x: Math.max(20, w / 2 - 500), y: Math.max(20, h / 2 - 350) } };
    if (id === 'projects') return { id, title: appText.projects, content: wrap(<ProjectsApp />), defaultSize: { width: Math.min(1000, w - 40), height: Math.min(700, h - 100) }, defaultPosition: { x: Math.max(30, w / 2 - 450), y: Math.max(30, h / 2 - 300) } };
    if (id.startsWith('project-')) {
      const projectId = id.replace('project-', '');
      const projects = getProjectsData(language);
      const project = projects.find(p => p.id === projectId);
      if (project) {
        return { id, title: project.name, content: wrap(<ProjectViewer project={project} />), defaultSize: { width: Math.min(1000, w - 40), height: Math.min(700, h - 100) }, defaultPosition: { x: Math.max(40, w / 2 - 400), y: Math.max(40, h / 2 - 250) } };
      }
    }
    if (id === 'terminal') return { id, title: appText.terminal, content: wrap(<ResumeTerminal />), defaultSize: { width: Math.min(700, w - 40), height: Math.min(450, h - 100) }, defaultPosition: { x: Math.max(20, w / 2 - 350), y: Math.max(20, h / 2 - 225) } };
    if (id === 'contact') return { id, title: appText.contact, content: wrap(<ContactApp />), defaultSize: { width: Math.min(800, w - 40), height: Math.min(500, h - 100) }, defaultPosition: { x: Math.max(20, w / 2 - 400), y: Math.max(20, h / 2 - 250) } };
    if (id === 'themes') return { id, title: appText.themes, content: wrap(<ThemeApp />), defaultSize: { width: Math.min(800, w - 40), height: Math.min(600, h - 100) }, defaultPosition: { x: Math.max(20, w / 2 - 400), y: Math.max(20, h / 2 - 300) } };
    return null;
  }, [appText, language]);

  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showWelcome, setShowWelcome] = useState(() => {
    return sessionStorage.getItem('lamego-os-welcome-shown') !== 'true';
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = useCallback((win: AppWindow) => {
    setOpenWindows(prev => {
      if (prev.find((w) => w.id === win.id)) return prev;
      return [...prev, win];
    });
    setActiveWindowId(win.id);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows(prev => {
      const next = prev.filter((w) => w.id !== id);
      return next;
    });
    setActiveWindowId(prev => prev === id ? null : prev);
  }, []);

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id);
  }, []);

  const closeWelcome = useCallback(() => {
    sessionStorage.setItem('lamego-os-welcome-shown', 'true');
    setShowWelcome(false);
  }, []);

  const openFromWelcome = useCallback((id: string) => {
    const config = getWindowConfig(id);
    if (config) {
      openWindow(config);
    }
    closeWelcome();
  }, [closeWelcome, getWindowConfig, openWindow]);

  useEffect(() => {
    const handleOpenWindow = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const config = getWindowConfig(customEvent.detail);
      if (config) {
        setOpenWindows(prev => {
          if (prev.find(w => w.id === config.id)) return prev;
          return [...prev, config];
        });
        setActiveWindowId(config.id);
      }
    };
    const handleCloseWindow = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      closeWindow(customEvent.detail);
    };
    window.addEventListener('open-os-window', handleOpenWindow);
    window.addEventListener('close-os-window', handleCloseWindow);
    return () => {
      window.removeEventListener('open-os-window', handleOpenWindow);
      window.removeEventListener('close-os-window', handleCloseWindow);
    };
  }, [getWindowConfig, closeWindow]);

  if (!hasBooted) {
    return <Suspense fallback={<div className="fixed inset-0 bg-black" />}><BootSequence onComplete={handleBootComplete} /></Suspense>;
  }

  return (
    <div className={`w-screen h-screen overflow-hidden ${currentTheme.wallpaper} bg-cover bg-center transition-all duration-500`} autoFocus>
      {/* Dark overlay for better icon visibility */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      <AnimatePresence>
        {showWelcome && (
          <WelcomeOverlay
            text={appText.welcome}
            language={language}
            onLanguageChange={setLanguage}
            onClose={closeWelcome}
            onOpenPortfolio={() => openFromWelcome('portfolio')}
            onOpenTerminal={() => openFromWelcome('terminal')}
          />
        )}
      </AnimatePresence>

      {/* iOS Status Bar */}
      {currentTheme.isIOS && (
        <div className="absolute top-0 left-0 w-full h-8 z-50 flex items-center justify-between px-6 text-white text-xs font-semibold pointer-events-none">
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <div className="flex gap-2 items-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <div className="flex gap-[2px] items-end h-3">
              <div className="w-1 h-1.5 bg-white rounded-sm"></div>
              <div className="w-1 h-2 bg-white rounded-sm"></div>
              <div className="w-1 h-2.5 bg-white rounded-sm"></div>
              <div className="w-1 h-3 bg-white/40 rounded-sm"></div>
            </div>
            <div className="w-5 h-2.5 border border-white/50 rounded-sm p-[1px] flex items-center">
              <div className="bg-white h-full w-[80%] rounded-sm"></div>
            </div>
          </div>
          {/* iPhone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl"></div>
        </div>
      )}

      {currentTheme.isIOS && (
        <button
          onClick={toggleLanguage}
          className="absolute right-4 top-10 z-[70] flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl"
          title={appText.languageLabel}
        >
          <Languages size={14} />
          {language.toUpperCase()}
        </button>
      )}

      {/* Desktop Environment */}
      <div className={`relative z-10 w-full h-full p-4 flex ${currentTheme.isIOS ? 'flex-row flex-wrap content-start pt-12 gap-x-4 gap-y-6 justify-center' : 'flex-col gap-4 items-start'} ${currentTheme.isMacOS ? 'pt-10' : ''}`}>
        <DesktopIcon
          icon={<User className="w-6 h-6 text-purple-400" />}
          label={language === 'pt' ? 'SobreMim.exe' : 'AboutMe.exe'}
          onOpen={() => {
            const config = getWindowConfig('portfolio');
            if (config) openWindow(config);
          }}
        />

        <DesktopIcon
          icon={<Briefcase className="w-6 h-6 text-yellow-400" />}
          label={appText.projects}
          onOpen={() => {
            const config = getWindowConfig('projects');
            if (config) openWindow(config);
          }}
        />
        
        <DesktopIcon
          icon={<Terminal className="w-6 h-6 text-green-400" />}
          label={appText.terminal}
          onOpen={() => {
            const config = getWindowConfig('terminal');
            if (config) openWindow(config);
          }}
        />

        <DesktopIcon
          icon={<Mail className="w-6 h-6 text-blue-400" />}
          label={appText.contact}
          onOpen={() => {
            const config = getWindowConfig('contact');
            if (config) openWindow(config);
          }}
        />

        <DesktopIcon
          icon={<Settings className="w-6 h-6 text-gray-300" />}
          label={appText.themes}
          onOpen={() => {
            const config = getWindowConfig('themes');
            if (config) openWindow(config);
          }}
        />
      </div>

      {/* Windows Manager */}
      <AnimatePresence>
        {openWindows.map((storedWindow) => {
          const windowConfig = getWindowConfig(storedWindow.id) ?? storedWindow;
          return (
            <Window
              key={storedWindow.id}
              id={windowConfig.id}
              title={windowConfig.title}
              onClose={() => closeWindow(windowConfig.id)}
              isActive={activeWindowId === windowConfig.id}
              onFocus={() => focusWindow(windowConfig.id)}
              defaultPosition={currentTheme.isIOS ? { x: 0, y: 0 } : windowConfig.defaultPosition}
              defaultSize={currentTheme.isIOS ? { width: globalThis.innerWidth, height: globalThis.innerHeight } : windowConfig.defaultSize}
              isMobile={currentTheme.isIOS}
              forceDark={windowConfig.id === 'portfolio'}
            >
              {windowConfig.content}
            </Window>
          );
        })}
      </AnimatePresence>

      {/* Start Menu */}
      {!currentTheme.isIOS && (
        <AnimatePresence>
        {isStartMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: currentTheme.isMacOS ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: currentTheme.isMacOS ? -20 : 20 }}
            className={`absolute ${currentTheme.isMacOS ? 'top-8 left-4' : 'bottom-12 left-0'} w-[360px] ${theme === 'win7' ? 'bg-white/80 dark:bg-black/30 backdrop-blur-2xl border border-black/10 dark:border-white/30 rounded-tr-lg rounded-tl-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_20px_rgba(0,0,0,0.5)] overflow-hidden' : 'bg-white/80 dark:bg-black/40 backdrop-blur-2xl rounded-2xl border border-black/10 dark:border-white/10'} p-4 z-50 flex flex-col gap-2 shadow-2xl`}
          >
            <div className={`flex items-center gap-4 p-3 border-b border-black/10 dark:border-white/10 mb-2`}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)]">AL</div>
              <div>
                <p className={`text-black dark:text-white font-bold drop-shadow-sm dark:drop-shadow-md`}>André Lamego</p>
                <p className={`text-black/70 dark:text-white/70 text-xs drop-shadow-sm dark:drop-shadow-md`}>{appText.engineer}</p>
              </div>
            </div>
            
            <div className={`flex flex-col gap-1 text-black dark:text-white`}>
              <button 
                onClick={() => {
                  const config = getWindowConfig('portfolio');
                  if (config) openWindow(config);
                  setIsStartMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all text-left group ${theme === 'win7' ? 'hover:bg-black/5 dark:hover:bg-white/20 hover:shadow-[inset_0_0_5px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_0_5px_rgba(255,255,255,0.3)] border border-transparent hover:border-black/10 dark:hover:border-white/20' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
              >
                <div className={`p-2 rounded-lg transition-colors ${theme === 'win7' ? 'bg-transparent shadow-md border border-black/10 dark:border-white/10 bg-gradient-to-b from-white/50 dark:from-white/10 to-transparent' : 'bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10'}`}>
                  <User size={18} className="text-purple-500 dark:text-purple-300 drop-shadow-sm" />
                </div>
                <span className="font-medium drop-shadow-sm dark:drop-shadow-md">{appText.portfolio}</span>
              </button>

              <button 
                onClick={() => {
                  const config = getWindowConfig('projects');
                  if (config) openWindow(config);
                  setIsStartMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all text-left group ${theme === 'win7' ? 'hover:bg-black/5 dark:hover:bg-white/20 hover:shadow-[inset_0_0_5px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_0_5px_rgba(255,255,255,0.3)] border border-transparent hover:border-black/10 dark:hover:border-white/20' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
              >
                <div className={`p-2 rounded-lg transition-colors ${theme === 'win7' ? 'bg-transparent shadow-md border border-black/10 dark:border-white/10 bg-gradient-to-b from-white/50 dark:from-white/10 to-transparent' : 'bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10'}`}>
                  <Briefcase size={18} className="text-yellow-500 dark:text-yellow-300 drop-shadow-sm" />
                </div>
                <span className="font-medium drop-shadow-sm dark:drop-shadow-md">{appText.projects}</span>
              </button>

              <button 
                onClick={() => {
                  const config = getWindowConfig('terminal');
                  if (config) openWindow(config);
                  setIsStartMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all text-left group ${theme === 'win7' ? 'hover:bg-black/5 dark:hover:bg-white/20 hover:shadow-[inset_0_0_5px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_0_5px_rgba(255,255,255,0.3)] border border-transparent hover:border-black/10 dark:hover:border-white/20' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
              >
                <div className={`p-2 rounded-lg transition-colors ${theme === 'win7' ? 'bg-transparent shadow-md border border-black/10 dark:border-white/10 bg-gradient-to-b from-white/50 dark:from-white/10 to-transparent' : 'bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10'}`}>
                  <Terminal size={18} className="text-green-500 dark:text-green-300 drop-shadow-sm" />
                </div>
                <span className="font-medium drop-shadow-sm dark:drop-shadow-md">{appText.terminal}</span>
              </button>

              <button 
                onClick={() => {
                  const config = getWindowConfig('contact');
                  if (config) openWindow(config);
                  setIsStartMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all text-left group ${theme === 'win7' ? 'hover:bg-black/5 dark:hover:bg-white/20 hover:shadow-[inset_0_0_5px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_0_5px_rgba(255,255,255,0.3)] border border-transparent hover:border-black/10 dark:hover:border-white/20' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
              >
                <div className={`p-2 rounded-lg transition-colors ${theme === 'win7' ? 'bg-transparent shadow-md border border-black/10 dark:border-white/10 bg-gradient-to-b from-white/50 dark:from-white/10 to-transparent' : 'bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10'}`}>
                  <Mail size={18} className="text-blue-500 dark:text-blue-300 drop-shadow-sm" />
                </div>
                <span className="font-medium drop-shadow-sm dark:drop-shadow-md">{appText.contact}</span>
              </button>

              <div className="h-px w-full bg-black/10 dark:bg-white/20 my-1 shadow-[0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_1px_0_rgba(0,0,0,0.5)]" />

              <button 
                onClick={() => {
                  const config = getWindowConfig('themes');
                  if (config) openWindow(config);
                  setIsStartMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all text-left group ${theme === 'win7' ? 'hover:bg-black/5 dark:hover:bg-white/20 hover:shadow-[inset_0_0_5px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_0_5px_rgba(255,255,255,0.3)] border border-transparent hover:border-black/10 dark:hover:border-white/20' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
              >
                <div className={`p-2 rounded-lg transition-colors ${theme === 'win7' ? 'bg-transparent shadow-md border border-black/10 dark:border-white/10 bg-gradient-to-b from-white/50 dark:from-white/10 to-transparent' : 'bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10'}`}>
                  <Settings size={18} className="text-gray-600 dark:text-gray-200 drop-shadow-sm" />
                </div>
                <span className="font-medium drop-shadow-sm dark:drop-shadow-md">{appText.themes}</span>
              </button>
            </div>
            
            {theme === 'win7' && (
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-white/20 dark:bg-black/20 border-l border-black/10 dark:border-white/10 pointer-events-none" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      )}

      {/* iOS Dock */}
      {currentTheme.isIOS && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-20 bg-white/20 backdrop-blur-2xl rounded-[30px] flex items-center justify-around px-4 border border-white/30 z-[40]">
          <DesktopIcon
            icon={<User className="w-6 h-6 text-purple-400" />}
            label={appText.portfolio}
            onOpen={() => {
              const config = getWindowConfig('portfolio');
              if (config) openWindow(config);
            }}
            isIOSDock
          />
          <DesktopIcon
            icon={<Briefcase className="w-6 h-6 text-yellow-400" />}
            label={appText.projects}
            onOpen={() => {
              const config = getWindowConfig('projects');
              if (config) openWindow(config);
            }}
            isIOSDock
          />

          <DesktopIcon
            icon={<Mail className="w-6 h-6 text-blue-400" />}
            label={appText.contact}
            onOpen={() => {
              const config = getWindowConfig('contact');
              if (config) openWindow(config);
            }}
            isIOSDock
          />
          <DesktopIcon
            icon={<Settings className="w-6 h-6 text-gray-300" />}
            label={appText.themes}
            onOpen={() => {
              const config = getWindowConfig('themes');
              if (config) openWindow(config);
            }}
            isIOSDock
          />
        </div>
      )}

      {/* Taskbar */}
      {!currentTheme.isIOS && (
        <div className={`absolute z-[60] flex items-center px-4 ${currentTheme.taskbar}`}>
          <div className={`flex items-center w-full ${currentTheme.taskbarJustify}`}>
            <div className="flex gap-2 h-full items-center">
              {/* Start Button */}
              <button 
                onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
                className={`${currentTheme.startBtn} ${isStartMenuOpen ? currentTheme.startBtnActive : ''} ${currentTheme.startBtnHover}`}
              >
                {currentTheme.startIcon}
              </button>
              
              {/* macOS Top Bar specific items */}
              {currentTheme.isMacOS && (
                <div className="flex items-center gap-4 text-black dark:text-white ml-4">
                  <span className="font-bold">{appText.finder}</span>
                  <span className="hidden md:inline">{appText.file}</span>
                  <span className="hidden md:inline">{appText.edit}</span>
                  <span className="hidden md:inline">{appText.view}</span>
                </div>
              )}
            </div>

            {/* Open Apps indicators - hide in macOS top bar */}
            {!currentTheme.isMacOS && (
              <div className="flex gap-1 md:gap-2 overflow-x-auto hide-scrollbar max-w-[60vw] items-center h-full">
                {openWindows.map(w => (
                  <button
                    key={w.id}
                    onClick={() => focusWindow(w.id)}
                    className={`px-3 md:px-4 h-[80%] min-w-10 max-w-40 rounded text-xs md:text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap flex-shrink-0
                      ${activeWindowId === w.id ? currentTheme.windowIcon : currentTheme.windowIconHover}
                    `}
                  >
                    <span className="hidden sm:inline truncate">{w.title}</span>
                    <span className="sm:hidden truncate">{w.title.substring(0, 10)}</span>
                  </button>
                ))}
              </div>
            )}

            {/* System Tray */}
            {currentTheme.isMacOS ? (
              <div className="flex items-center gap-4 h-full relative z-[60]">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 rounded px-2 py-1 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                  title={appText.languageLabel}
                >
                  <Languages size={14} />
                  <span>{language.toUpperCase()}</span>
                </button>
                {/* Status Items */}
                <div className="flex items-center gap-3">
                  <Wifi size={14} className="text-black dark:text-white drop-shadow-sm dark:drop-shadow-md" />
                  <Battery size={14} className="text-black dark:text-white drop-shadow-sm dark:drop-shadow-md" />
                </div>
                {/* Clock */}
                <div className="text-black dark:text-white font-medium drop-shadow-sm dark:drop-shadow-md">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ) : (
              <div className={`flex items-center gap-4 text-sm font-medium px-4 h-full cursor-default text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors`}>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 rounded px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10"
                  title={appText.languageLabel}
                >
                  <Languages size={14} />
                  <span>{language.toUpperCase()}</span>
                </button>
                <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* macOS Dock */}
      {currentTheme.isMacOS && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-16 bg-white/50 dark:bg-black/40 backdrop-blur-2xl border border-black/10 dark:border-white/20 rounded-2xl flex items-center px-4 gap-4 z-50 shadow-2xl">
          <button 
            onClick={() => {
              const config = getWindowConfig('portfolio');
              if (config) openWindow(config);
            }}
            className="w-12 h-12 bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 border border-black/5 dark:border-transparent rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-lg relative group"
          >
            <User size={24} className="text-purple-600 dark:text-purple-400" />
            {openWindows.find(w => w.id === 'portfolio') && (
              <div className="absolute -bottom-2 w-1 h-1 bg-black/50 dark:bg-white/50 rounded-full" />
            )}
            <span className="absolute -top-10 bg-white/80 dark:bg-black/50 text-black dark:text-white border border-black/10 dark:border-white/10 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-md shadow-sm">{appText.portfolio}</span>
          </button>

          <button 
            onClick={() => {
              const config = getWindowConfig('projects');
              if (config) openWindow(config);
            }}
            className="w-12 h-12 bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 border border-black/5 dark:border-transparent rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-lg relative group"
          >
            <Briefcase size={24} className="text-yellow-600 dark:text-yellow-400" />
            {openWindows.find(w => w.id === 'projects') && (
              <div className="absolute -bottom-2 w-1 h-1 bg-black/50 dark:bg-white/50 rounded-full" />
            )}
            <span className="absolute -top-10 bg-white/80 dark:bg-black/50 text-black dark:text-white border border-black/10 dark:border-white/10 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-md shadow-sm">{appText.projects}</span>
          </button>
          
          <button 
            onClick={() => {
              const config = getWindowConfig('terminal');
              if (config) openWindow(config);
            }}
            className="w-12 h-12 bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 border border-black/5 dark:border-transparent rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-lg relative group"
          >
            <Terminal size={24} className="text-green-600 dark:text-green-400" />
            {openWindows.find(w => w.id === 'terminal') && (
              <div className="absolute -bottom-2 w-1 h-1 bg-black/50 dark:bg-white/50 rounded-full" />
            )}
            <span className="absolute -top-10 bg-white/80 dark:bg-black/50 text-black dark:text-white border border-black/10 dark:border-white/10 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-md shadow-sm">{appText.terminal}</span>
          </button>

          <button 
            onClick={() => {
              const config = getWindowConfig('contact');
              if (config) openWindow(config);
            }}
            className="w-12 h-12 bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 border border-black/5 dark:border-transparent rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-lg relative group"
          >
            <Mail size={24} className="text-blue-600 dark:text-blue-400" />
            {openWindows.find(w => w.id === 'contact') && (
              <div className="absolute -bottom-2 w-1 h-1 bg-black/50 dark:bg-white/50 rounded-full" />
            )}
            <span className="absolute -top-10 bg-white/80 dark:bg-black/50 text-black dark:text-white border border-black/10 dark:border-white/10 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-md shadow-sm">{appText.contact}</span>
          </button>

          <div className="w-px h-8 bg-black/10 dark:bg-white/20" />

          <button 
            onClick={() => {
              const config = getWindowConfig('themes');
              if (config) openWindow(config);
            }}
            className="w-12 h-12 bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 border border-black/5 dark:border-transparent rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-lg relative group"
          >
            <Settings size={24} className="text-gray-600 dark:text-gray-300" />
            {openWindows.find(w => w.id === 'themes') && (
              <div className="absolute -bottom-2 w-1 h-1 bg-black/50 dark:bg-white/50 rounded-full" />
            )}
            <span className="absolute -top-10 bg-white/80 dark:bg-black/50 text-black dark:text-white border border-black/10 dark:border-white/10 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-md shadow-sm">{appText.themes}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
