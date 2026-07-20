import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Terminal } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "Lamego OS Bootloader v2.4.1",
  "Initializing hardware...",
  "CPU: OK",
  "RAM: 64GB OK",
  "Mounting root filesystem...",
  "[ OK ] Reached target Local File Systems.",
  "Starting system logger...",
  "Loading kernel modules...",
  "[ OK ] Started Network Manager.",
  "Starting User Authentication Service...",
  "System ready."
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logs' | 'auth'>('logs');
  const [logs, setLogs] = useState<string[]>([]);
  const [authStatus, setAuthStatus] = useState<'idle' | 'typing' | 'authenticating' | 'success'>('idle');

  useEffect(() => {
    if (phase === 'logs') {
      let currentLog = 0;
      const interval = setInterval(() => {
        if (currentLog < BOOT_LOGS.length) {
          const nextLog = BOOT_LOGS[currentLog];
          if (nextLog) {
            setLogs(prev => [...prev, nextLog]);
          }
          currentLog++;
        } else {
          clearInterval(interval);
          setTimeout(() => setPhase('auth'), 600);
        }
      }, 150);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'auth') {
      setTimeout(() => {
        setAuthStatus('typing');
        setTimeout(() => {
          setAuthStatus('authenticating');
          setTimeout(() => {
            setAuthStatus('success');
            setTimeout(() => {
              onComplete();
            }, 800);
          }, 600);
        }, 1000);
      }, 500);
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 bg-black text-white z-[9999] flex flex-col font-mono">
      {/* Skip Button */}
      <button 
        onClick={onComplete}
        className="absolute top-4 right-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-xs font-sans transition-colors z-50 text-white/70 hover:text-white"
      >
        Pular (Skip)
      </button>

      <AnimatePresence mode="wait">
        {phase === 'logs' && (
          <motion.div 
            key="logs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 p-6 flex flex-col gap-1 overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4 text-green-400">
              <Terminal size={20} />
              <span>/bin/bash</span>
            </div>
            {logs.map((log, i) => {
              if (!log) return null;
              return (
                <div key={i} className="text-sm text-gray-300">
                  {log.includes('[ OK ]') ? (
                    <span><span className="text-green-400">[ OK ]</span> {log.replace('[ OK ] ', '')}</span>
                  ) : log}
                </div>
              );
            })}
            <div className="animate-pulse w-2 h-4 bg-gray-300 mt-1" />
          </motion.div>
        )}

        {phase === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center font-sans"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <User size={48} className="text-white/50" />
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-8 tracking-widest text-white/90"
            >
              ANDRÉ LAMEGO
            </motion.h1>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-64 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center px-4 relative overflow-hidden"
            >
              <Lock size={16} className="text-white/40 mr-3 z-10" />
              <div className="flex-1 flex gap-1.5 z-10 items-center h-full pt-1">
                {authStatus !== 'idle' && [...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: authStatus === 'typing' ? i * 0.1 : 0 }}
                    className="w-2 h-2 rounded-full bg-white/70"
                  />
                ))}
                {authStatus === 'typing' && (
                  <motion.div 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-[1px] h-4 bg-white/70 ml-1"
                  />
                )}
              </div>
              
              <AnimatePresence>
                {authStatus === 'authenticating' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/5 flex items-center justify-center z-20 backdrop-blur-sm"
                  >
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                  </motion.div>
                )}
                {authStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-20 backdrop-blur-sm border border-green-500/30 rounded-lg"
                  >
                    <span className="text-green-400 font-medium text-sm drop-shadow-md">Acesso Concedido</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
