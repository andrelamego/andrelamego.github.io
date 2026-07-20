import React, { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useTheme } from '../../contexts/theme';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  isActive: boolean;
  onFocus: () => void;
  isMobile?: boolean;
  forceDark?: boolean;
}

export function Window({
  title,
  children,
  onClose,
  defaultPosition = { x: 50, y: 50 },
  defaultSize = { width: 800, height: 600 },
  isActive,
  onFocus,
  isMobile,
  forceDark,
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const { theme } = useTheme();
  const dragControls = useDragControls();

  const getThemeClasses = () => {
    switch (theme) {
      case 'win7':
        return {
          window: 'bg-gradient-to-b from-white/80 to-white/60 dark:from-white/30 dark:to-black/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_0_5px_rgba(255,255,255,0.5),0_15px_25px_rgba(0,0,0,0.5)] rounded-t-xl rounded-b p-[6px] border border-black/20 dark:border-black/50',
          header: 'bg-transparent text-black dark:text-white h-7 px-1 mb-1',
          headerTitle: 'text-black dark:text-white font-semibold text-sm drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ml-2',
          controls: 'flex gap-0.5 ml-auto absolute right-[2px] top-[2px]',
          btnBase: 'w-11 h-5 flex items-center justify-center rounded-sm transition-all border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
          btnClose: 'bg-gradient-to-b from-red-400 to-red-600 hover:brightness-125 border border-red-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] rounded-tr-lg',
          btnMin: 'bg-gradient-to-b from-black/5 to-black/10 dark:from-white/10 dark:to-black/10 hover:brightness-125',
          btnMax: 'bg-gradient-to-b from-black/5 to-black/10 dark:from-white/10 dark:to-black/10 hover:brightness-125',
          content: 'bg-white dark:bg-[#1a1a1a] rounded-sm border border-black/40 text-black dark:text-white',
        };
      case 'macOS':
        return {
          window: 'bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-2xl border border-black/10 dark:border-white/20 rounded-xl shadow-2xl',
          header: 'bg-transparent text-black/90 dark:text-white/90',
          headerTitle: 'text-black/80 dark:text-white/80 font-medium text-sm text-center w-full absolute',
          controls: 'flex gap-2 relative z-10',
          btnBase: 'w-3 h-3 rounded-full flex items-center justify-center group border border-black/10',
          btnClose: 'bg-[#ff5f56]',
          btnMin: 'bg-[#ffbd2e]',
          btnMax: 'bg-[#27c93f]',
          content: 'bg-white/50 dark:bg-black/40 text-black dark:text-white',
        };
      default:
        return {
          window: 'bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-xl shadow-2xl border border-black/10 dark:border-white/10',
          header: 'bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10',
          headerTitle: 'text-black/70 dark:text-white/70 font-medium text-xs',
          controls: 'flex gap-2',
          btnBase: 'w-3 h-3 rounded-full flex items-center justify-center group',
          btnClose: 'bg-red-500 hover:bg-red-600',
          btnMin: 'bg-yellow-500 hover:bg-yellow-600',
          btnMax: 'bg-green-500 hover:bg-green-600',
          content: 'bg-white/50 dark:bg-black/40 text-black dark:text-white',

        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <motion.div
      drag={!isMaximized && !isMobile}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={isMobile ? { y: '100vh', opacity: 1 } : { opacity: 0, scale: 0.95 }}
      animate={isMobile ? {
        y: 0,
        opacity: 1,
        width: '100vw',
        height: '100vh',
        x: 0,
      } : {
        opacity: 1,
        scale: 1,
        ...(isMaximized
          ? { x: -defaultPosition.x, y: -defaultPosition.y, width: '100vw', height: '100vh' }
          : { x: 0, y: 0, width: defaultSize.width, height: defaultSize.height }),
      }}
      exit={isMobile ? { y: '100vh', opacity: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onPointerDown={onFocus}
      className={`fixed flex flex-col ${isMobile ? 'bg-black text-white' : themeClasses.window} ${
        isActive ? 'z-[100]' : 'z-40'
      } ${forceDark ? 'dark' : ''}`}
      style={{
        left: isMobile ? 0 : defaultPosition.x,
        top: isMobile ? 0 : defaultPosition.y,
        position: 'absolute',
        resize: (isMaximized || isMobile) ? 'none' : 'both',
        overflow: 'hidden',
        minWidth: isMobile ? '100vw' : '300px',
        minHeight: isMobile ? '100vh' : '200px'
      }}
    >
      {/* Window Header */}
      {!isMobile && (
        <div
          className={`window-header h-10 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing select-none relative ${themeClasses.header}`}
          onPointerDown={(event) => {
            if (!isMaximized) {
              dragControls.start(event);
            }
          }}
        >
          
          {theme === 'win7' ? (
            <>
              <div className={`flex items-center gap-2 ${themeClasses.headerTitle}`}>
                {title}
              </div>
              <div className={themeClasses.controls}>
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`${themeClasses.btnBase} ${themeClasses.btnMin}`}
                >
                  <Minus size={10} className="text-black dark:text-white" />
                </button>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`${themeClasses.btnBase} ${themeClasses.btnMax}`}
                >
                  <Maximize2 size={10} className="text-black dark:text-white" />
                </button>
                <button
                  onClick={onClose}
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`${themeClasses.btnBase} ${themeClasses.btnClose}`}
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={themeClasses.controls}>
                <button
                  onClick={onClose}
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`${themeClasses.btnBase} ${themeClasses.btnClose}`}
                >
                  <X size={8} className={`${theme === 'macOS' ? 'opacity-0 group-hover:opacity-100 text-black/60' : 'opacity-0 group-hover:opacity-100 text-black'}`} />
                </button>
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`${themeClasses.btnBase} ${themeClasses.btnMin}`}
                >
                  <Minus size={8} className={`${theme === 'macOS' ? 'opacity-0 group-hover:opacity-100 text-black/60' : 'opacity-0 group-hover:opacity-100 text-black'}`} />
                </button>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`${themeClasses.btnBase} ${themeClasses.btnMax}`}
                >
                  <Maximize2 size={8} className={`${theme === 'macOS' ? 'opacity-0 group-hover:opacity-100 text-black/60' : 'opacity-0 group-hover:opacity-100 text-black'}`} />
                </button>
              </div>
              <div className={themeClasses.headerTitle}>{title}</div>
              <div className="w-12" /> {/* Spacer for centering title */}
            </>
          )}
        </div>
      )}

      {/* iPhone Top Padding */}
      {isMobile && (
        <div className="w-full h-8 flex-shrink-0" />
      )}

      {/* Window Content */}
      <div className={`flex-1 overflow-auto ${isMobile ? 'bg-[#030303] text-white' : themeClasses.content}`}>
        {children}
      </div>

      {/* iOS Home Indicator */}
      {isMobile && (
        <div className="w-full h-6 flex-shrink-0 bg-transparent flex items-center justify-center cursor-pointer pb-2" onClick={onClose}>
          <div className="w-1/3 h-1.5 bg-white/50 hover:bg-white transition-colors rounded-full" />
        </div>
      )}
    </motion.div>
  );
}
